def validate_json(json_data):
    required_fields = [
        "budget", "duration_months", "employees", "management_resources",
        "training_costs", "communication_costs", "adoption_speed_months",
        "employee_competence_percent", "utilization_percent", "financial_risks",
        "productivity_savings", "risk_reduction", "project_info"
    ]
    for field in required_fields:
        if field not in json_data:
            raise ValueError(f"Missing field: {field}")