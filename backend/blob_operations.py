from azure.storage.blob import BlobServiceClient
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración de Azure Blob Storage
BLOB_CONNECTION_STRING = os.getenv("BLOB_CONNECTION_STRING")
CONTAINER_NAME = "csv_container"  # Nombre del contenedor para archivos CSV

# Cliente de Blob Storage
blob_service_client = BlobServiceClient.from_connection_string(BLOB_CONNECTION_STRING)
container_client = blob_service_client.get_container_client(CONTAINER_NAME)

def save_csv_to_blob(file_name: str, file_content: str) -> bool:
    """Guarda un archivo CSV en Azure Blob Storage."""
    try:
        blob_client = container_client.get_blob_client(file_name)
        blob_client.upload_blob(file_content, overwrite=True)
        return True
    except Exception as e:
        print(f"Error saving CSV to blob: {e}")
        return False

def retrieve_csv_from_blob(file_name: str) -> str:
    """Recupera un archivo CSV desde Azure Blob Storage."""
    try:
        blob_client = container_client.get_blob_client(file_name)
        if not blob_client.exists():
            return None
        blob_data = blob_client.download_blob()
        return blob_data.readall().decode('utf-8')
    except Exception as e:
        print(f"Error retrieving CSV from blob: {e}")
        return None