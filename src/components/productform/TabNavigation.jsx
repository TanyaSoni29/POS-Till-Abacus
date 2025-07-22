import {
  LayoutGrid,
  SlidersHorizontal,
  FileText,
  Image,
  ShoppingCart,
  ListOrdered,
  Ruler,
  StickyNote,
} from 'lucide-react';

const tabs = [
  { key: 'EPOS INFO', label: 'EPOS INFO', icon: <LayoutGrid size={18} /> },
  { key: 'MIN/MAX', label: 'MIN/MAX', icon: <SlidersHorizontal size={18} /> },
  { key: 'DESCRIPTIONS', label: 'DESCRIPTIONS', icon: <FileText size={18} /> },
  { key: 'IMAGES', label: 'IMAGES', icon: <Image size={18} /> },
  { key: 'E-COMMERCE INFO', label: 'E-COMMERCE INFO', icon: <ShoppingCart size={18} /> },
  { key: 'SPECIFICATION', label: 'SPECIFICATION', icon: <ListOrdered size={18} /> },
  { key: 'GEOMETRY', label: 'GEOMETRY', icon: <Ruler size={18} /> },
  { key: 'PRODUCT NOTES', label: 'PRODUCT NOTES', icon: <StickyNote size={18} /> },
];

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <aside className="w-52 border-r border-gray-200 bg-gray-50">
      <nav className="p-4 space-y-2">
        <ul className="text-gray-700 font-medium space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 transition-colors
                ${
                  activeTab === tab.key
                    ? 'bg-blue-100 text-blue-700 border border-blue-600'
                    : 'hover:text-gray-800 hover:bg-gray-200'
                }`}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
