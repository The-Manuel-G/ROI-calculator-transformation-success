import azure.functions as func
import logging
import json
from blob_operations import save_csv_to_blob, retrieve_csv_from_blob

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="saveNretrieve", methods=["GET", "POST"])
def csv_operations(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Processing CSV request.')

    try:
        if req.method == "POST":
            # Guardar un archivo CSV
            return save_csv(req)
        elif req.method == "GET":
            # Recuperar un archivo CSV
            return retrieve_csv(req)
        else:
            return func.HttpResponse(
                "Method not allowed. Use GET or POST.",
                status_code=405
            )
    except Exception as e:
        logging.error(f"Error processing request: {e}")
        return func.HttpResponse(
            f"An error occurred: {str(e)}",
            status_code=500
        )

def save_csv(req: func.HttpRequest) -> func.HttpResponse:
    """Guarda un archivo CSV en Azure Blob Storage."""
    try:
        # Leer el cuerpo de la solicitud
        req_body = req.get_json()

        # Obtener el nombre del archivo y el contenido
        file_name = req_body.get("file_name")
        file_content = req_body.get("file_content")

        if not file_name or not file_content:
            return func.HttpResponse(
                "Please provide 'file_name' and 'file_content' in the request body.",
                status_code=400
            )

        # Guardar el archivo en Blob Storage
        if save_csv_to_blob(file_name, file_content):
            return func.HttpResponse(
                f"File '{file_name}' uploaded successfully.",
                status_code=200
            )
        else:
            return func.HttpResponse(
                f"Failed to upload file '{file_name}'.",
                status_code=500
            )
    except Exception as e:
        logging.error(f"Error saving CSV: {e}")
        return func.HttpResponse(
            f"An error occurred while saving the CSV: {str(e)}",
            status_code=500
        )

def retrieve_csv(req: func.HttpRequest) -> func.HttpResponse:
    """Recupera un archivo CSV desde Azure Blob Storage."""
    try:
        # Obtener el nombre del archivo desde los parámetros de la solicitud
        file_name = req.params.get("file_name")
        if not file_name:
            return func.HttpResponse(
                "Please provide 'file_name' as a query parameter.",
                status_code=400
            )

        # Recuperar el archivo desde Blob Storage
        file_content = retrieve_csv_from_blob(file_name)
        if file_content:
            return func.HttpResponse(
                body=file_content,
                status_code=200,
                mimetype="text/csv"
            )
        else:
            return func.HttpResponse(
                f"File '{file_name}' not found.",
                status_code=404
            )
    except Exception as e:
        logging.error(f"Error retrieving CSV: {e}")
        return func.HttpResponse(
            f"An error occurred while retrieving the CSV: {str(e)}",
            status_code=500
        )