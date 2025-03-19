import os
from openai import AzureOpenAI
from dotenv import load_dotenv
from key_vault import get_secret

# Cargar variables del archivo .env
load_dotenv()

# Crear cliente OpenAI para Azure
client = AzureOpenAI(
    api_key= get_secret("AZURE-OPENAI-API-KEY"),
    azure_endpoint= get_secret("AZURE-OPENAI-ENDPOINT"),
    api_version= get_secret("AZURE-OPENAI-API-VERSION")
)

# Función para obtener recomendaciones de OpenAI
def get_recommendations(prompt):
    recommendations = {}
    context = """
    
    be nic
    """ 
    try:
        response = client.chat.completions.create(
            model= get_secret("AZURE-OPENAI-MODEL"),  # Se usa el modelo gpt-4
            messages=[ 
                {"role": "system", "content": context},
                {"role": "user", "content": prompt}
            ]
        )
        # Extraer y guardar la recomendación
        recommendation = response.choices[0].message.content

    except Exception as e:
        print("Error:", e)

    return recommendation

# Prueba con una pregunta
respuesta = get_recommendations("¿Qué es la inteligencia artificial?")
print(respuesta)
