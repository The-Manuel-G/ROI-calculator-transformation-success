import os
from openai import AzureOpenAI
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# Crear cliente OpenAI para Azure
client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION")
)

# Función para obtener recomendaciones de OpenAI
def get_recommendations(prompt):
    recommendations = {}
    context = """
    
    be nic
    """ 
    try:
        response = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_MODEL"),  # Se usa el modelo gpt-4
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
