import React from 'react';

const Sidebar = ({ navigation }) => {
  return (
    <div className="w-[20%] flex h-screen flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <ul className="mt-6 space-y-1">
          {navigation.map((item, index) => (
            <li key={index}>
              {item.options ? (
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium">{item.name} *</span>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  {/* Submenu for options */}
                  <ul className="mt-2 space-y-1 px-4">
                    {item.options.map((subItem, subIndex) => (
                      <li key={subIndex} className='flex flex-row items-center'>
                        <a
                          href={subItem.href}
                          className={`block rounded-lg px-4 py-2 text-sm font-medium ${subItem.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                          {subItem.name}
                        </a>
                        <div className='bg-black text-white rounded-full pl-2 size-6'>{subIndex + 1}</div>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <a
                  href={item.href}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium ${item.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
