import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
          status: 'Найден'
        },
        {
          id: 2,
          name: 'Петров Петр Петрович',
          phone: '+7 (999) 987-65-43',
          document: 'Паспорт: 9876 543210',
          car: 'В456ГД77',
          status: 'Найден'
        }
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

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
            <h3 className="text-2xl font-bold text-black mb-8">Результаты поиска</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {results.map((result) => (
                <Card key={result.id} className="bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-black">{result.name}</CardTitle>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {result.status}
                      </Badge>
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
                    <Separator />
                    <Button variant="outline" className="w-full">
                      Подробная информация
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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