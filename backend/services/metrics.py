def calculate_metrics(json_data):
    employees = json_data["employees"]
    management_resources = json_data["management_resources"]
    employee_competence_percent = json_data["employee_competence_percent"]
    utilization_percent = json_data["utilization_percent"]
    training_costs = json_data["training_costs"]
    communication_costs = json_data["communication_costs"]
    productivity_savings = json_data["productivity_savings"]
    budget = json_data["budget"]

    employee_demotion_percent = (employees / (employees + management_resources)) * 20
    success_probability_percent = (employee_competence_percent + utilization_percent) / 2
    roi_percent = (productivity_savings - (training_costs + communication_costs)) / budget * 100

    return employee_demotion_percent, success_probability_percent, roi_percent