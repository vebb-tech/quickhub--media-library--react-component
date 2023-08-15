export default function cls(...classes) {
    return classes.filter((x) => x).join(" ")
}