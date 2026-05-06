"use client";

import { useAuth } from '@/lib/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { api } from '@/lib/api';
import { Button, Input, useToast , PageErrorState } from '@/components/ui';
import Link from 'next/link';
import { ArrowLeft01Icon, PlusSignIcon, Cancel01Icon, ArrowUp01Icon, ArrowDown01Icon } from 'hugeicons-react';
import { HotelSection, HotelDetailData } from '@/lib/hotel-mock-data';
import * as HugeIcons from 'hugeicons-react';

const COMMON_ICONS = [
  'Building03Icon', 'BedSingle02Icon', 'Restaurant01Icon', 'Coffee02Icon',
  'Tree02Icon', 'SwimmingIcon', 'WaveIcon', 'Location01Icon', 'FerrisWheelIcon',
  'MessageMultiple01Icon', 'ThumbsUpIcon', 'Note01Icon', 'StarIcon', 'Wifi01Icon',
  'Car01Icon', 'Briefcase02Icon'
];

const IconRenderer = ({ iconName, size = 20 }: { iconName: string, size?: number }) => {
  const IconComponent = (HugeIcons as Record<string, React.ElementType>)[iconName] || HugeIcons.CircleIcon;
  return <IconComponent size={size} />;
};

function HotelFormContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  const { success } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    imageUrl: '',
    tags: [] as string[]
  });

  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hotelDetail, setHotelDetail] = useState<HotelDetailData | null>(null);
  const [sections, setSections] = useState<HotelSection[]>([]);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [editingSectionIndex, setEditingSectionIndex] = useState<number | null>(null);

  // Section form state
  const [secTitle, setSecTitle] = useState('');
  const [secId, setSecId] = useState('');
  const [secContent, setSecContent] = useState('');
  const [secIcon, setSecIcon] = useState('StarIcon');
  const [secPaywalled, setSecPaywalled] = useState(false);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push('/dashboard');
    } else if (editId) {
      let mounted = true;
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
      }
      loadHotel();
      return () => { mounted = false; };
    }
  }, [user, router, editId]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleSaveSection = () => {
    if (!secTitle || !secId) return;
    const newSection: HotelSection = {
      id: secId,
      title: secTitle,
      content: secContent,
      icon: secIcon,
      isPaywalled: secPaywalled,
      mediaCount: 0
    };

    if (editingSectionIndex !== null) {
      const updated = [...sections];
      updated[editingSectionIndex] = newSection;
      setSections(updated);
    } else {
      setSections([...sections, newSection]);
    }

    resetSectionForm();
  };

  const handleEditSection = (index: number) => {
    const s = sections[index];
    setSecId(s.id);
    setSecTitle(s.title);
    setSecContent(s.content);
    setSecIcon(s.icon || 'StarIcon');
    setSecPaywalled(s.isPaywalled || false);
    setEditingSectionIndex(index);
    setShowSectionForm(true);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const moveSection = (index: number, dir: 'up' | 'down') => {
    if (dir === 'up' && index === 0) return;
    if (dir === 'down' && index === sections.length - 1) return;

    const newIndex = dir === 'up' ? index - 1 : index + 1;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setSections(updated);
  };

  const resetSectionForm = () => {
    setSecId('');
    setSecTitle('');
    setSecContent('');
    setSecIcon('StarIcon');
    setSecPaywalled(false);
    setEditingSectionIndex(null);
    setShowSectionForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.description) return;

    setIsSubmitting(true);

    const hotelId = editId || Math.random().toString(36).substring(2, 11);

    try {
      await api.saveHotel({
        id: hotelId,
        ...formData,
        link: `/hotels/${hotelId}`
      });

      await api.saveHotelDetail({
        slug: hotelId,
        name: formData.name,
        location: formData.location,
        shootingDate: hotelDetail?.shootingDate || new Date().toLocaleDateString('ru-RU'),
        stars: hotelDetail?.stars || 5,
        distanceToSea: hotelDetail?.distanceToSea || 'Не указано',
        distanceToCity: hotelDetail?.distanceToCity || 'Не указано',
        googleRating: hotelDetail?.googleRating || 5.0,
        buildYear: hotelDetail?.buildYear || new Date().getFullYear(),
        mealPlan: hotelDetail?.mealPlan || 'Не указано',
        heroImage: formData.imageUrl,
        sections: sections
      });

      success(editId ? 'Отель обновлен' : 'Новый отель добавлен');
      router.refresh();
      router.push('/dashboard/admin/hotels');
    } catch (error) {
       console.error("Error saving hotel", error);
    } finally {
       setIsSubmitting(false);
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="space-y-10">
      <Link href="/dashboard/admin/hotels" className="inline-flex items-center gap-2 text-secondary-text hover:text-primary-text transition-colors text-sm font-medium">
        <ArrowLeft01Icon size={16} /> Назад к списку
      </Link>

      <h1 className="font-moniqa text-[clamp(40px,5vw,72px)] text-primary-text leading-none">
        {editId ? 'Редактирование отеля' : 'Новый отель'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            label="Название отеля" 
            required 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <Input 
            label="Локация (регион)" 
            required 
            value={formData.location} 
            onChange={e => setFormData({...formData, location: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">Описание</label>
          <textarea 
            required
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-primary-text font-century-gothic text-base focus:outline-none focus:border-evergreen-forest transition-colors min-h-[150px] resize-y"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <Input 
          label="URL изображения"
          value={formData.imageUrl} 
          onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
          placeholder="https://..."
        />

        <div>
          <label className="block text-sm font-medium text-primary-text mb-2">Теги</label>
          <div className="flex gap-2 mb-3">
            <Input 
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              placeholder="Например: Для семьи"
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <Button type="button" onClick={handleAddTag} variant="secondary" className="px-4">
              <PlusSignIcon size={20} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags?.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-soft-sand text-secondary-text text-sm rounded-full">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-primary-text">
                  <Cancel01Icon size={14} />
                </button>
              </span>
            ))}
            {(!formData.tags || formData.tags.length === 0) && (
              <span className="text-sm text-gray-400">Нет тегов</span>
            )}
          </div>
        </div>

        {/* === СЕКЦИИ ОТЕЛЯ === */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-moniqa text-3xl text-primary-text leading-none">Секции отеля</h3>
            {!showSectionForm && (
              <Button type="button" onClick={() => setShowSectionForm(true)} size="sm" className="flex items-center gap-2">
                <PlusSignIcon size={16} /> Добавить секцию
              </Button>
            )}
          </div>

          {showSectionForm && (
            <div className="bg-soft-sand p-6 rounded-xl border border-gray-200 mb-6 space-y-4">
              <h4 className="font-century-gothic font-medium text-primary-text mb-2">
                {editingSectionIndex !== null ? 'Редактирование секции' : 'Новая секция'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="ID секции (напр: rooms)" required value={secId} onChange={e => setSecId(e.target.value)} />
                <Input label="Название (напр: Номера)" required value={secTitle} onChange={e => setSecTitle(e.target.value)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Иконка</label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_ICONS.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSecIcon(icon)}
                      className={`p-2 rounded-lg border transition-all ${secIcon === icon ? 'bg-evergreen-forest text-white border-evergreen-forest' : 'bg-white text-secondary-text hover:border-evergreen-forest/50'}`}
                    >
                      <IconRenderer iconName={icon} size={24} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">Контент</label>
                <textarea
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-primary-text font-century-gothic text-base focus:outline-none focus:border-evergreen-forest min-h-[100px] resize-y"
                  value={secContent}
                  onChange={e => setSecContent(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="secPaywalled"
                  checked={secPaywalled}
                  onChange={e => setSecPaywalled(e.target.checked)}
                  className="w-4 h-4 text-evergreen-forest rounded border-gray-300 focus:ring-evergreen-forest"
                />
                <label htmlFor="secPaywalled" className="text-sm text-primary-text">Доступно только по подписке (Paywall)</label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={resetSectionForm} size="sm">Отмена</Button>
                <Button type="button" onClick={handleSaveSection} size="sm">Сохранить секцию</Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {sections.map((sec, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-soft-sand text-evergreen-forest flex items-center justify-center shrink-0">
                    <IconRenderer iconName={sec.icon || 'StarIcon'} />
                  </div>
                  <div>
                    <h5 className="font-century-gothic font-medium text-primary-text text-sm">{sec.title}</h5>
                    <p className="text-xs text-secondary-text">ID: {sec.id} {sec.isPaywalled ? '• Paywall' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="p-1.5 text-secondary-text hover:text-primary-text disabled:opacity-30">
                    <ArrowUp01Icon size={18} />
                  </button>
                  <button type="button" onClick={() => moveSection(idx, 'down')} disabled={idx === sections.length - 1} className="p-1.5 text-secondary-text hover:text-primary-text disabled:opacity-30">
                    <ArrowDown01Icon size={18} />
                  </button>
                  <div className="w-px h-6 bg-gray-200 mx-1"></div>
                  <Button type="button" variant="secondary" size="sm" onClick={() => handleEditSection(idx)} className="px-3">Ред.</Button>
                  <Button type="button" variant="dangerOutline" size="sm" onClick={() => handleRemoveSection(idx)} className="px-3">Удалить</Button>
                </div>
              </div>
            ))}
            {sections.length === 0 && !showSectionForm && (
              <p className="text-sm text-secondary-text text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                Секции пока не добавлены
              </p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <Link href="/dashboard/admin/hotels">
            <Button type="button" variant="ghost" disabled={isSubmitting}>Отмена</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : (editId ? 'Сохранить изменения' : 'Добавить отель')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function HotelFormPage() {
  return (
    <Suspense fallback={<div className="p-8">Загрузка...</div>}>
      <HotelFormContent />
    </Suspense>
  );
}
