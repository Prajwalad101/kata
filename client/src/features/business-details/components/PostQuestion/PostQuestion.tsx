import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from 'src/components';

interface PostQuestionProps {
  closeDialog: () => void;
}

export default function PostQuestion({ closeDialog }: PostQuestionProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="mb-12" onSubmit={handleSubmit}>
      <div className="mb-5 flex items-center gap-5">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-500 text-white">
          <span>A</span>
        </div>
        <p>Anonymous</p>
      </div>

      <div>
        <textarea
          id="question"
          rows={7}
          className="mb-3 w-full rounded-md bg-gray-200 py-4 px-5 ring-inset ring-blue-500 focus:outline-none focus:ring"
          placeholder="Write your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <p className="text-right text-sm text-gray-600">
          {question.length} / 200
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-8">
        <SecondaryButton className="px-8 py-2" onClick={closeDialog}>
          Cancel
        </SecondaryButton>
        <PrimaryButton className="px-10 py-2" type="submit">
          Post
        </PrimaryButton>
      </div>
      <div className="border-b border-gray-300" />
    </form>
  );
}
