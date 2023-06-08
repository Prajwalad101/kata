/**
 * Calculates and returns the count of visible children inside the container
 * @param containerElement The container Div element
 * @param childElement The child Div element inside the container element
 * @returns the number of visible child elements inside the container
 */

interface Props {
  containerElement: HTMLDivElement;
}

function getVisibleChildrenCount({ containerElement }: Props) {
  const parentElement = containerElement.parentElement;
  const childElement = containerElement.firstChild as HTMLElement;
  if (!parentElement) return;

  const parentContainerWidth = parentElement.clientWidth;
  const childWidth = childElement?.offsetWidth || 1;

  const childCount = Math.round(parentContainerWidth / childWidth);
  return childCount;
}

export default getVisibleChildrenCount;
