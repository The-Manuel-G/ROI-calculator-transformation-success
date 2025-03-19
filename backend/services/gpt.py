import os
from openai import AzureOpenAI
from dotenv import load_dotenv
from services.key_vault import get_secret

# Cargar variables del archivo .env
load_dotenv()

# Crear cliente OpenAI para Azure
client = AzureOpenAI(
    api_key= get_secret("AZURE-OPENAI-API-KEY"),
    azure_endpoint= get_secret("AZURE-OPENAI-ENDPOINT"),
    api_version= get_secret("AZURE-OPENAI-API-VERSION")
)

# Función para obtener recomendaciones de OpenAI
def get_recommendations(prompt, input_data, output_data):
    recommendations = {}
    context = f"""
    Te proporcionaré un conjunto de datos de entrada y salida relacionados con un análisis empresarial. Tu tarea es analizar todos los valores y proporcionar una explicación detallada sobre su significado, relaciones y posibles implicaciones.

    Informacion del proyecto:
    {prompt}

    Datos ingresados por el usuario:
    {input_data}

    Datos de predicción (salida):
    {output_data}

    Tareas:
    1. Identifica relaciones: Analiza cómo los valores de entrada pueden afectar los valores de salida.
    2. Discute implicaciones: ¿Qué significa que el ROI sea negativo? ¿Cómo influyen la competencia de los empleados y la velocidad de adopción en la productividad?
    3. Propón mejoras: Con base en los datos, sugiere estrategias para mejorar la rentabilidad y reducir riesgos.

    Instrucciones adicionales:
    - Sé detallado y usa un lenguaje claro.
    - Usa ejemplos si es necesario.
    - Identifica posibles riesgos y oportunidades basándote en los datos.
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

