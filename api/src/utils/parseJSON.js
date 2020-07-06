export default (json) => {
    try {
        return JSON.parse(json || '{}');
    } catch {
        return {};
    }
}