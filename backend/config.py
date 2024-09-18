from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Quản lý sân bóng"
    model_config = SettingsConfigDict(env_file=".env")
    mongo_url: str = ""


settings = Settings()
