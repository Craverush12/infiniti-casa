import React from 'react';

interface LoadingSkeletonProps {
  type: 'hero' | 'amenities' | 'booking' | 'testimonials';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type }) => {
  if (type === 'hero') {
    return (
      <div className="relative min-h-screen bg-slate-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="h-16 bg-slate-300 rounded-lg mb-4 w-96 max-w-full" />
            <div className="h-8 bg-slate-300 rounded-lg mb-6 w-64 mx-auto" />
            <div className="flex justify-center space-x-4">
              <div className="h-10 bg-slate-300 rounded-lg w-32" />
              <div className="h-10 bg-slate-300 rounded-lg w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'amenities') {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-12 bg-slate-300 rounded-lg mb-4 w-96 mx-auto animate-pulse" />
            <div className="h-6 bg-slate-300 rounded-lg w-64 mx-auto animate-pulse" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-slate-300 rounded-lg mb-4 w-32" />
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-slate-300 rounded" />
                      <div className="h-4 bg-slate-300 rounded w-32" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === 'booking') {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="h-10 bg-slate-300 rounded-lg mb-4 w-80 mx-auto animate-pulse" />
            <div className="h-6 bg-slate-300 rounded-lg w-64 mx-auto animate-pulse" />
          </div>
          <div className="bg-white/95 rounded-2xl p-8 shadow-lg animate-pulse">
            <div className="h-8 bg-slate-300 rounded-lg mb-8 w-48 mx-auto" />
            <div className="space-y-4">
              <div className="h-12 bg-slate-300 rounded-lg" />
              <div className="h-12 bg-slate-300 rounded-lg" />
              <div className="h-12 bg-slate-300 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (type === 'testimonials') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-10 bg-slate-300 rounded-lg mb-4 w-64 mx-auto animate-pulse" />
            <div className="h-6 bg-slate-300 rounded-lg w-48 mx-auto animate-pulse" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-slate-300 rounded-full mr-4" />
                  <div>
                    <div className="h-4 bg-slate-300 rounded w-24 mb-2" />
                    <div className="h-3 bg-slate-300 rounded w-16" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-300 rounded w-full" />
                  <div className="h-4 bg-slate-300 rounded w-3/4" />
                  <div className="h-4 bg-slate-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default LoadingSkeleton; 