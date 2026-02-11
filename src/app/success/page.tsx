import { Suspense } from 'react';
import SuccessContent from './SuccessContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center pt-20">Yükleniyor...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
