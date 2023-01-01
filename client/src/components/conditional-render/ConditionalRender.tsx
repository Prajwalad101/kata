interface ConditionalRenderProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
}

function ConditionalRender({
  children,
  isLoading,
  isError,
}: ConditionalRenderProps) {
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    alert('Error when fetching data. Check the console for details');
  }

  return <div>{children}</div>;
}

export default ConditionalRender;
