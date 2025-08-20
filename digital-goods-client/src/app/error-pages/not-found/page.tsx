'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import SEOHead from '@/components/common/SEOHead';

export default function NotFoundPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const shapeRef = useRef<HTMLDivElement>(null);
  
  // Animation effect when component mounts
  useEffect(() => {
    setMounted(true);
    
    // Mouse move parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapeRef.current) return;
      
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      
      shapeRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <SEOHead
        title="Không tìm thấy trang - HKZeus Nexus"
        description="Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển."
        type="website"
      />
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden relative">
        {/* Left side: Animated shape */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <div 
            ref={shapeRef}
            className={`w-64 h-64 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20 transition-transform duration-300 ${mounted ? 'scale-100' : 'scale-0'}`}
            style={{ 
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 70%, transparent 100%)',
              boxShadow: '0 0 100px rgba(239, 68, 68, 0.1)'
            }}
          ></div>
          
          {/* Floating elements */}
          <div className={`absolute top-1/4 left-1/4 w-8 h-8 bg-red-300 rounded-full opacity-60 animate-bounce transition-all duration-500 ${mounted ? 'opacity-60' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}></div>
          <div className={`absolute top-3/4 right-1/4 w-6 h-6 bg-red-400 rounded-full opacity-40 animate-bounce transition-all duration-500 ${mounted ? 'opacity-40' : 'opacity-0'}`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute bottom-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full opacity-50 animate-bounce transition-all duration-500 ${mounted ? 'opacity-50' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}></div>
          
          {/* Main 404 text */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${mounted ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'}`}>
            <div className="text-center">
              <h2 className="text-8xl md:text-9xl font-bold text-red-500 mb-4 tracking-tighter">404</h2>
              <div className="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 font-medium">Page Not Found</p>
            </div>
          </div>
        </div>
        
        {/* Right side: Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* Pixel-perfect red line */}
          <div className="w-12 h-1 bg-red-500 mb-6 hidden md:block"></div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            <span className="text-red-500">Không</span> tìm thấy trang
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          
          {/* Main CTA */}
          <Button
            onClick={() => router.push('/')}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 h-auto rounded-full text-lg font-semibold shadow-lg hover:shadow-red-200 transition-all duration-300"
          >
            Quay lại trang chủ
          </Button>
        </div>
      </div>
      
      {/* Bottom dot pattern */}
      <div className="absolute bottom-0 w-full h-8 bg-repeat-x" style={{ backgroundImage: 'radial-gradient(circle, #f87171 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
      
      {/* Additional styles */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </>
  );
}