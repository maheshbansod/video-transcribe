import { useState } from 'react';
import VideoUploader from './components/VideoUploader'
import { Button } from './components/ui/button'
import { useAuthSignedIn } from './hooks/auth';
import { useVideos } from './hooks/videos';
import type { TranscribeCallbackParams, UploadCallbackParams } from './types/video';

function App() {
  const { user, signOut } = useAuthSignedIn();
  const { videos } = useVideos();
  const [transcription, setTranscription] = useState<string | undefined>();
  console.log({ videos });
  const onTranscribe = ({ video, transcription }: TranscribeCallbackParams) => {
    console.log(video, transcription);
    setTranscription(transcription);
    // update firebase
  };
  const onUpload = ({ video }: UploadCallbackParams) => {
    // update firebase
    console.log(video);
  };
  return (
    <>
      <header className='flex p-1'>
        Welcome {user?.displayName}
        <Button variant={'outline'} className='ml-auto'
          onClick={signOut}>
          Sign out
        </Button>
      </header>
      <VideoUploader
        onTranscribe={onTranscribe}
        onUpload={onUpload}
      />
      {transcription && <>Transcription: {transcription}</>}
    </>
  )
}

export default App
