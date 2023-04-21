export function useCounter() {
    const count = ref(0)
    function click() {
        count.value++;
    }
    return {
        count,
        click
    }
}