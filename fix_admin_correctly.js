const fs = require('fs');

function fixList(filePath, objName, getFuncName, title, message) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add import
    if (!content.includes('PageErrorState')) {
        content = content.replace(/import { Button(.*?)} from '@\/components\/ui';/, "import { Button$1, PageErrorState } from '@/components/ui';");
        if (!content.includes('PageErrorState')) {
             content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport { PageErrorState } from '@/components/ui';");
        }
    }

    const oldEffect = `      let mounted = true;
      async function load${objName}() {
        const data = await api.${getFuncName}();
        if (mounted) set${objName}(data);
      }`;

    const newEffect = `      let mounted = true;
      async function load${objName}() {
        setIsLoading(true);
        setIsError(false);
        try {
          const data = await api.${getFuncName}();
          if (mounted) set${objName}(data);
        } catch (err) {
          console.error("Failed to load", err);
          if (mounted) setIsError(true);
        } finally {
          if (mounted) setIsLoading(false);
        }
      }`;

    if (content.includes(oldEffect)) {
        content = content.replace(oldEffect, newEffect);
    }

    if (!content.includes("const [isLoading, setIsLoading] = useState(true);")) {
       const stateMatch = content.match(/const \[(.*?)\] = useState<(.*?)>\(\[\]\);/);
       if (stateMatch) {
           content = content.replace(stateMatch[0], stateMatch[0] + "\n  const [isLoading, setIsLoading] = useState(true);\n  const [isError, setIsError] = useState(false);");
       }
    }

    // UI
    let container = '<div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">';
    if (!content.includes(container)) {
        container = '<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">';
    }

    const newContainer = `{isError ? (
        <PageErrorState
          title="${title}"
          message="${message}"
        />
      ) : isLoading ? (
        <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-evergreen-forest/20 border-t-evergreen-forest rounded-full animate-spin"></div>
        </div>
      ) : (
      ${container}`;

    if (content.includes(container) && !content.includes('<PageErrorState')) {
        content = content.replace(container, newContainer);

        // Find closing
        if (content.endsWith("        </table>\n      </div>\n    </div>\n  );\n}")) {
            content = content.replace("        </table>\n      </div>\n    </div>\n  );\n}", "        </table>\n      </div>\n      )}\n    </div>\n  );\n}");
        } else if (content.endsWith("        ))}\n      </div>\n    </div>\n  );\n}")) {
            content = content.replace("        ))}\n      </div>\n    </div>\n  );\n}", "        ))}\n      </div>\n      )}\n    </div>\n  );\n}");
        } else if (content.includes("        </table>\n      </div>\n\n      {selectedRequest && (")) {
            content = content.replace("        </table>\n      </div>\n\n      {selectedRequest && (", "        </table>\n      </div>\n      )}\n\n      {selectedRequest && (");
        }
    }

    fs.writeFileSync(filePath, content);
}


function fixForm(filePath, formName, title, message) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add import
    if (!content.includes('PageErrorState')) {
        content = content.replace(/import { Button(.*?)} from '@\/components\/ui';/, "import { Button$1, PageErrorState } from '@/components/ui';");
    }

    if (!content.includes("const [isLoading, setIsLoading] = useState(false);")) {
        content = content.replace("const [isSubmitting, setIsSubmitting] = useState(false);", "const [isSubmitting, setIsSubmitting] = useState(false);\n  const [isLoading, setIsLoading] = useState(false);\n  const [isError, setIsError] = useState(false);");
    }

    if (formName === 'Hotel') {
        const oldEffect = `      let mounted = true;
      async function loadHotel() {
        const hotels = await api.getHotels();
        const hotel = hotels.find(h => h.id === editId);
        if (mounted && hotel) {
          setFormData({
            ...hotel,
            tags: hotel.tags || []
          });

          const detail = await api.getHotelDetailBySlug(editId as string);
          if (mounted && detail) {
            setHotelDetail(detail);
            setSections(detail.sections || []);
          }
        }
      }`;
        const newEffect = `      let mounted = true;
      async function loadHotel() {
        setIsLoading(true);
        setIsError(false);
        try {
          const hotels = await api.getHotels();
          const hotel = hotels.find(h => h.id === editId);
          if (mounted && hotel) {
            setFormData({
              ...hotel,
              tags: hotel.tags || []
            });

            const detail = await api.getHotelDetailBySlug(editId as string);
            if (mounted && detail) {
              setHotelDetail(detail);
              setSections(detail.sections || []);
            }
          }
        } catch (err) {
          console.error("Failed to load hotel", err);
          if (mounted) setIsError(true);
        } finally {
          if (mounted) setIsLoading(false);
        }
      }`;
        content = content.replace(oldEffect, newEffect);
    } else {
        const oldEffect = `      let mounted = true;
      async function loadNews() {
        try {
          const newsList = await api.getAdminNews();
          const news = newsList.find((n: NewsItem) => n.id === editId);
          if (mounted && news) {
            setFormData({
              title: news.title,
              category: news.category,
              content: news.content,
              imageUrl: news.imageUrl || '',
              publishedAt: new Date(news.publishedAt).toISOString().slice(0, 16)
            });
          }
        } catch (error) {
           console.error("Error loading news:", error);
        }
      }`;
        const newEffect = `      let mounted = true;
      async function loadNews() {
        setIsLoading(true);
        setIsError(false);
        try {
          const newsList = await api.getAdminNews();
          const news = newsList.find((n: NewsItem) => n.id === editId);
          if (mounted && news) {
            setFormData({
              title: news.title,
              category: news.category,
              content: news.content,
              imageUrl: news.imageUrl || '',
              publishedAt: new Date(news.publishedAt).toISOString().slice(0, 16)
            });
          }
        } catch (error) {
           console.error("Error loading news:", error);
           if (mounted) setIsError(true);
        } finally {
           if (mounted) setIsLoading(false);
        }
      }`;
        content = content.replace(oldEffect, newEffect);
    }

    // UI
    const container = '<form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">';
    const newContainer = `{isError ? (
        <PageErrorState
          title="${title}"
          message="${message}"
        />
      ) : isLoading ? (
        <div className="py-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-evergreen-forest/20 border-t-evergreen-forest rounded-full animate-spin"></div>
        </div>
      ) : (
      ${container}`;

    if (content.includes(container) && !content.includes('<PageErrorState')) {
        content = content.replace(container, newContainer);
        content = content.replace("        </div>\n      </form>\n    </div>\n  );\n}", "        </div>\n      </form>\n      )}\n    </div>\n  );\n}");
    }

    fs.writeFileSync(filePath, content);
}


fixList('src/app/dashboard/admin/hotels/page.tsx', 'Hotels', 'getHotels', 'Ошибка загрузки отелей', 'Не удалось загрузить список отелей. Пожалуйста, попробуйте обновить страницу.');
fixList('src/app/dashboard/admin/news/page.tsx', 'NewsData', 'getAdminNews', 'Ошибка загрузки новостей', 'Не удалось загрузить список новостей. Пожалуйста, попробуйте обновить страницу.');
fixList('src/app/dashboard/admin/requests/page.tsx', 'Requests', 'getReviewRequests', 'Ошибка загрузки запросов', 'Не удалось загрузить список запросов на обзор. Пожалуйста, попробуйте обновить страницу.');
fixList('src/app/dashboard/admin/users/page.tsx', 'Users', 'getAllProfiles', 'Ошибка загрузки пользователей', 'Не удалось загрузить список пользователей. Пожалуйста, попробуйте обновить страницу.');

fixForm('src/app/dashboard/admin/hotels/form/page.tsx', 'Hotel', 'Ошибка загрузки данных', 'Не удалось загрузить данные отеля для редактирования. Пожалуйста, попробуйте обновить страницу.');
fixForm('src/app/dashboard/admin/news/form/page.tsx', 'News', 'Ошибка загрузки данных', 'Не удалось загрузить данные новости для редактирования. Пожалуйста, попробуйте обновить страницу.');
