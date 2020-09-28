export default (Node) => {
    if(!window.customElements.get(Node.NODENAME))
        window.customElements.define(Node.NODENAME, Node);
}