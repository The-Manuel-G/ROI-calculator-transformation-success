from flask import Flask, request, jsonify
from services.gpt import get_recommendations
from services.utils import validate_json
from services.metrics import calculate_metrics

"""
El servidor recibe un JSON con los siguientes campos:

- budget: Presupuesto
- duration_months: Duración del proyecto en meses
- employees: Número de empleados
- management_resources: Recursos de gestión
- training_costs: Costos de capacitación
- communication_costs: Costos de comunicación
- adoption_speed_months: Velocidad de adopción en meses
- employee_competence_percent: Porcentaje de competencia de los empleados
- utilization_percent: Porcentaje de utilización
- financial_risks: Riesgos financieros
- productivity_savings: Ahorros de productividad
- risk_reduction: Reducción de riesgos
- project_info: Información del proyecto
"""

app = Flask(__name__)

@app.route("/data", methods=["POST"])
def data():
    try:
        json_data = request.get_json()
        validate_json(json_data)

        employee_demotion_percent, success_probability_percent, roi_percent = calculate_metrics(json_data)

        input_data = {key: json_data[key] for key in json_data if key != "project_info"}
        output_data = {
            "employee_demotion_percent": employee_demotion_percent,
            "success_probability_percent": success_probability_percent,
            "roi_percent": roi_percent
        }

        recommendation = get_recommendations(json_data["project_info"], input_data, output_data)

        processed_data = {
            "employee_demotion_percent": round(employee_demotion_percent, 2),
            "success_probability_percent": round(success_probability_percent, 2),
            "roi_percent": round(roi_percent, 2),
            "recommendation": recommendation
        }

        return jsonify({"received_data": json_data, "processed_data": processed_data}), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)
