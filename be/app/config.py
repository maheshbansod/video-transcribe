from dotenv import dotenv_values

config = dotenv_values(".env")

DATABASE_URL = f"postgresql://{config.get('DB_USER')}:{config.get('DB_PASS')}@{config.get('DB_HOST')}:{config.get('DB_PORT')}/{config.get('DB_NAME')}"
