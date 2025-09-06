import React from 'react';
import { 
  Home, 
  Flame, 
  Lightbulb, 
  Bookmark,
  Gift,
  GraduationCap,
  RectangleHorizontal,
  Image,
  FileText,
  Pencil,
  Calculator
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const masterLibraryItems = [
    { icon: Home, label: 'Home', link: '/library' },
    { icon: Flame, label: 'Popular', link: '/library/popular' },
    { icon: Lightbulb, label: 'Product Requests', link: '/library/product-requests' },
    { icon: Bookmark, label: 'Saved', link: '/library/saved' }
  ];

  const resourcesItems = [
    { icon: Gift, label: 'Special Deals', badge: 'NEW', link: '/library/special-deals' },
    { icon: GraduationCap, label: 'Digital Product University', link: '/library/digital-product-university' },
    { icon: RectangleHorizontal, label: 'Product Mockups', link: '/library/product-mockups' },
    { icon: Image, label: 'Book Covers', badge: 'NEW', link: '/library/book-covers' }
  ];

  const toolsItems = [
    { icon: FileText, label: 'PDF Rebrander', link: '/library/pdf-rebrander' },
    { icon: Pencil, label: 'Product Descriptions', link: '/library/product-descriptions' },
    { icon: Lightbulb, label: 'Product Ideas', link: '/library/product-ideas' },
    { icon: FileText, label: 'Book Title Generator', link: '/library/book-title-generator' },
    { icon: Calculator, label: 'Revenue Calculator', link: '/library/revenue-calculator' }
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SidebarItem = ({ icon: Icon, label, badge, link }: { icon: any, label: string, badge?: string, link: string }) => {
    const isActive = location.pathname === link;
    
    return (
      <Link 
        to={link} 
        className={`flex items-center justify-between px-4 py-2 cursor-pointer group transition-colors ${
          isActive 
            ? 'bg-red-500 opacity-65 text-white border-r-2 border-red-400' 
            : 'hover:bg-gray-800'
        }`}
      >
        <div className='flex items-center gap-3'>
          <Icon className={`w-5 h-5 transition-colors ${
            isActive 
              ? 'text-white' 
              : 'text-white group-hover:text-red-400'
          }`} />
          <span className={`text-sm font-medium transition-colors ${
            isActive 
              ? 'text-white' 
              : 'text-white group-hover:text-red-400'
          }`}>
            {label}
          </span>
        </div>
        {badge && (
          <span className='border-yellow-400 border text-yellow-200 text-xs px-2 py-1 rounded-md font-semibold'>
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className='px-4 py-2'>
      <h3 className='text-gray-400 text-xs font-semibold uppercase tracking-wider'>
        {title}
      </h3>
    </div>
  );

  return (
    <div className='bg-black h-full overflow-y-scroll w-64 flex flex-col justify-baseline'>
      <div className='flex flex-col'>

      
      {/* Header */}
      <div className='flex items-center gap-3 px-4 py-6 border-b border-gray-800'>
        <div className='w-8 h-8 bg-red-600 rounded flex items-center justify-center'>
          <span className='text-white font-bold text-lg'>E</span>
        </div>
        <h1 className='text-white text-xl font-bold'>E-Book</h1>
      </div>

      {/* Navigation Sections */}
      <div className='py-4'>
        {/* Master Library Section */}
        <div className='mb-6'>
          <SectionHeader title="Master Library" />
          <div className='mt-2'>
            {masterLibraryItems.map((item, index) => (
              <SidebarItem key={index} icon={item.icon} label={item.label} link={item.link} />
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className='mb-6'>
          <SectionHeader title="Resources" />
          <div className='mt-2'>
            {resourcesItems.map((item, index) => (
              <SidebarItem key={index} icon={item.icon} label={item.label} badge={item.badge} link={item.link} />
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className='mb-6'>
          <SectionHeader title="Tools" />
          <div className='mt-2'>
            {toolsItems.map((item, index) => (
              <SidebarItem key={index} icon={item.icon} label={item.label} link={item.link} />
            ))}
          </div>
        </div>
      </div>
      </div>
        <div className='px-4 py-2'>
          <h3 className='text-gray-400 text-xs font-semibold uppercase tracking-wider '>
            Account
          </h3>
        </div>

    </div>
  );
};

export default Sidebar;