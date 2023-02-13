import { useState } from 'react';
import { classNames } from 'src/utils/tailwind';
import QASection from '../QASection/QASection';
import ReviewSection from '../ReviewSection/ReviewSection';

interface CommunitySectionProps {
  className?: string;
}

export default function CommunitySection({
  className = '',
}: CommunitySectionProps) {
  const [selectedSection, setSelectedSection] = useState('reviews');

  return (
    <div className={classNames('relative', className)}>
      <div className="b mb-8 border-b border-gray-300" />
      <div className="mb-5 flex items-center justify-between">
        <h4 className="font-merriweather text-2xl font-bold">Community</h4>
        {/* Buttons are rendered here using portals */}
        {selectedSection === 'q&a' && <div id="ask-question-button" />}
        {selectedSection === 'reviews' && <div id="start-review-button" />}
      </div>
      {/* Tabs */}
      <div className="mb-8 flex items-center gap-8">
        <button
          className={classNames(
            ' border-b-[3px]  border-black px-3 py-2 text-lg font-medium',
            selectedSection !== 'reviews' ? 'border-black/0 text-black/60' : ''
          )}
          onClick={() => setSelectedSection('reviews')}
        >
          Reviews
        </button>
        <button
          className={classNames(
            'border-b-[3px] border-black px-3 py-2 text-lg font-medium',
            selectedSection !== 'q&a' ? 'border-black/0 text-black/60' : ''
          )}
          onClick={() => setSelectedSection('q&a')}
        >
          Q & A
        </button>
      </div>

      {selectedSection === 'reviews' && <ReviewSection />}
      {selectedSection === 'q&a' && <QASection />}
    </div>
  );
}
