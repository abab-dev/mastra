import { useParams, useSearchParams } from 'react-router';
import { useTraces, WorkflowTraces } from '@mastra/playground-ui';

import { Skeleton } from '@/components/ui/skeleton';

import { WorkflowInformation } from '@/domains/workflows/workflow-information';
import { useWorkflow } from '@/hooks/use-workflows';

function WorkflowTracesContent() {
  const { workflowId } = useParams();
  const [searchParams] = useSearchParams();
  const runId = searchParams.get('runId');
  const stepName = searchParams.get('stepName');
  const { workflow, isLoading: isWorkflowLoading } = useWorkflow(workflowId!);

  const { traces, error, firstCallLoading } = useTraces(workflow?.name || '', '', true);

  if (isWorkflowLoading || firstCallLoading) {
    return (
      <main className="flex-1 relative grid grid-cols-[1fr_325px] divide-x h-full">
        <div className="p-4">
          <Skeleton className="h-[600px]" />
        </div>
        <div className="flex flex-col">
          <WorkflowInformation workflowId={workflowId!} />
        </div>
      </main>
    );
  }

  return <WorkflowTraces traces={traces} error={error} runId={runId || undefined} stepName={stepName || undefined} />;
}

function WorkflowTracesPage() {
  return <WorkflowTracesContent />;
}

export default WorkflowTracesPage;
