import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['name', 'phone', 'document', 'car']);

  const handleSearch = async () => {
    setIsSearching(true);
    // Имитация поиска
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          name: 'Иванов Иван Иванович',
          phone: '+7 (999) 123-45-67',
          document: 'Паспорт: 1234 567890',
          car: 'А123БВ77',
          status: 'Найден',
          type: 'Физ. лицо',
          date: '2024-01-15',
          confidence: 95
        },
        {
          id: 2,
          name: 'Петров Петр Петрович',
          phone: '+7 (999) 987-65-43',
          document: 'Паспорт: 9876 543210',
          car: 'В456ГД77',
          status: 'Частично найден',
          type: 'Физ. лицо',
          date: '2024-01-20',
          confidence: 78
        },
        {
          id: 3,
          name: 'Сидоров Сидор Сидорович',
          phone: '+7 (999) 555-55-55',
          document: 'Паспорт: 5555 555555',
          car: 'С789ДЕ77',
          status: 'Найден',
          type: 'ИП',
          date: '2024-01-25',
          confidence: 89
        },
        {
          id: 4,
          name: 'Козлов Козло Козлович',
          phone: '+7 (999) 777-77-77',
          document: 'Паспорт: 7777 777777',
          car: 'К111ЛМ77',
          status: 'Не найден',
          type: 'Физ. лицо',
          date: '2024-01-30',
          confidence: 0
        }
      ];
      setResults(mockResults);
      setIsSearching(false);
      setShowFilters(true);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Найден':
        return 'text-green-600 border-green-600';
      case 'Частично найден':
        return 'text-yellow-600 border-yellow-600';
      case 'Не найден':
        return 'text-red-600 border-red-600';
      default:
        return 'text-gray-600 border-gray-600';
    }
  };

  const filteredAndSortedResults = useMemo(() => {
    let filtered = results.filter(result => {
      // Фильтр по статусу
      if (statusFilter !== 'all' && result.status !== statusFilter) {
        return false;
      }
      return true;
    });

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'ru');
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'confidence':
          return b.confidence - a.confidence;
        default:
          return 0;
      }
    });

    return filtered;
  }, [results, statusFilter, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Search" size={32} />
              <h1 className="text-2xl font-bold text-black">PEOPLE SEARCH</h1>
            </div>
            <nav className="flex gap-6">
              <a href="#search" className="text-black hover:text-gray-600 font-medium">Поиск</a>
              <a href="#contacts" className="text-black hover:text-gray-600 font-medium">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="search" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Поиск информации о людях</h2>
          <p className="text-lg text-gray-600 mb-12">
            Найдите информацию по ФИО, номеру телефона, документам или номеру автомобиля
          </p>

          {/* Search Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-black">Введите данные для поиска</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={searchType} onValueChange={setSearchType}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="name" className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    ФИО
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Icon name="Phone" size={16} />
                    Телефон
                  </TabsTrigger>
                  <TabsTrigger value="document" className="flex items-center gap-2">
                    <Icon name="FileText" size={16} />
                    Документ
                  </TabsTrigger>
                  <TabsTrigger value="car" className="flex items-center gap-2">
                    <Icon name="Car" size={16} />
                    Авто
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="name" className="space-y-4">
                  <Input
                    placeholder="Введите ФИО (например: Иванов Иван Иванович)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-lg"
                  />
                </TabsContent>

                <TabsContent value="phone" className="space-y-4">
                  <Input
                    placeholder="Введите номер телефона (например: +7 999 123 45 67)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-lg"
                  />
                </TabsContent>

                <TabsContent value="document" className="space-y-4">
                  <Input
                    placeholder="Введите номер документа (например: 1234 567890)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-lg"
                  />
                </TabsContent>

                <TabsContent value="car" className="space-y-4">
                  <Input
                    placeholder="Введите номер автомобиля (например: А123БВ77)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-lg"
                  />
                </TabsContent>
              </Tabs>

              <Button 
                onClick={handleSearch}
                className="w-full h-12 text-lg bg-black text-white hover:bg-gray-800"
                disabled={!searchQuery || isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <Icon name="Loader2" size={20} className="animate-spin" />
                    Поиск...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon name="Search" size={20} />
                    Найти
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {results.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-black">
                Результаты поиска ({filteredAndSortedResults.length})
              </h3>
              
              {/* Filters Toggle */}
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Icon name="Filter" size={16} />
                Фильтры
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg text-black flex items-center gap-2">
                    <Icon name="Filter" size={20} />
                    Фильтры и сортировка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Sort By */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-black">Сортировать по:</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Имени</SelectItem>
                          <SelectItem value="date">Дате добавления</SelectItem>
                          <SelectItem value="confidence">Точности совпадения</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-black">Статус:</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все статусы</SelectItem>
                          <SelectItem value="Найден">Найден</SelectItem>
                          <SelectItem value="Частично найден">Частично найден</SelectItem>
                          <SelectItem value="Не найден">Не найден</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Reset Filters */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-black">Действия:</label>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSortBy('name');
                          setStatusFilter('all');
                        }}
                        className="w-full"
                      >
                        Сбросить фильтры
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredAndSortedResults.map((result) => (
                <Card key={result.id} className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-black">{result.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${result.type === 'ИП' ? 'text-blue-600 border-blue-600' : 'text-purple-600 border-purple-600'}`}>
                          {result.type}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(result.status)}>
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon name="Phone" size={16} />
                      <span>{result.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon name="FileText" size={16} />
                      <span>{result.document}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon name="Car" size={16} />
                      <span>{result.car}</span>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        <span>{new Date(result.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Target" size={14} />
                        <span>Точность: {result.confidence}%</span>
                      </div>
                    </div>
                    
                    <Separator />
                    <Button variant="outline" className="w-full">
                      Подробная информация
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredAndSortedResults.length === 0 && results.length > 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">Нет результатов</h4>
                <p className="text-gray-500">Попробуйте изменить фильтры поиска</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Контакты</h2>
            <p className="text-lg text-gray-600">Свяжитесь с нами для получения дополнительной информации</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={24} className="mt-1 text-black" />
                <div>
                  <h4 className="font-semibold text-black mb-1">Телефон</h4>
                  <p className="text-gray-600">+7 (999) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="Mail" size={24} className="mt-1 text-black" />
                <div>
                  <h4 className="font-semibold text-black mb-1">Email</h4>
                  <p className="text-gray-600">info@peoplesearch.ru</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={24} className="mt-1 text-black" />
                <div>
                  <h4 className="font-semibold text-black mb-1">Адрес</h4>
                  <p className="text-gray-600">г. Москва, ул. Примерная, д. 123</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="Clock" size={24} className="mt-1 text-black" />
                <div>
                  <h4 className="font-semibold text-black mb-1">Время работы</h4>
                  <p className="text-gray-600">Пн-Пт: 9:00 - 18:00</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-black">Отправить сообщение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Телефон" />
                <textarea 
                  className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Ваше сообщение"
                />
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Отправить сообщение
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 People Search. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;