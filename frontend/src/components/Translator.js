const translatePriority = (priority) => {
    switch (priority) {
        case "LOW": return "Низкий";
        case "MEDIUM": return "Средний";
        case "HIGH": return "Высокий";
        case "URGENT": return "Срочный";
        case "CRITICAL": return "Критически важный";
    }
}

const translateStatus = (status) => {
    switch (status) {
        case "IN_PROGRESS": return "Выполняется";
        case "ON_HOLD": return "Отложена";
        case "COMPLETED": return "Выполнена";
    }
}

const translateRegularity = (regularity) => {
    switch (regularity) {
        case "NOT_REGULAR": return "Не повторять";
        case "DAILY": return "Каждый день";
        case "WEEKLY": return "Каждую неделю";
        case "MONTHLY": return "Каждый месяц";
        case "YEARLY": return "Каждый год";
    }
}

const Translator = {
    translatePriority,
    translateStatus,
    translateRegularity,
};

export default Translator;