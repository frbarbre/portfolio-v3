import HighlightWrapper from './higlight-wrapper';
import { customTheme } from '@/utils/prism-theme';

const CodeBlock = ({ node }: { node: any }) => {
  const code = node.text || '';
  const language = node.spans[0]?.data?.label || 'typescript'; // Default to 'typescript'

  return (
    <HighlightWrapper theme={customTheme} code={code} language={language}>
      {code}
    </HighlightWrapper>
  );
};

export default CodeBlock;
