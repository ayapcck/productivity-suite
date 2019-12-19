export function clickedInsideContainer(ev, container) {
    const clickX = ev.clientX;
    const clickY = ev.clientY;
    if (clickX !== 0 && clickY !== 0) {
		const containerRect = container.getBoundingClientRect();
        return clickX > containerRect.left 
            && clickX < containerRect.right 
            && clickY > containerRect.top 
            && clickY < containerRect.bottom;
    }
}