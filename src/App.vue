<template>
  <div id="app" class="min-h-screen">
    
    <!-- How We Work Секция -->
    <HowWeWorkSection
    :title="mockData.howWeWork.title"
    :items="mockData.howWeWork.items"
    />
    
    <!-- Expertise Секция -->
    <ExpertiseSection
    :title="mockData.expertise.title"
    :subtitle="mockData.expertise.subtitle"
    :cards="mockData.expertise.items"
    />
    
    <!-- Cases Секция -->
    <CasesSection
    :title="mockData.cases.title"
    :subtitle="mockData.cases.subtitle"
    :cases="mockData.cases.items"
    />
    
    <!-- Reviews Секция -->
    <ReviewsSection
    :title="mockData.reviews.title"
    :subtitle="mockData.reviews.subtitle"
    :reviews="mockData.reviews.items"
    />
    
    <!-- FAQ Секция -->
    <FaqSection
      :title="mockData.faq.title"
      :faq-items="mockData.faq.items"
    />
    
    <!-- Benefits Секция -->
    <BenefitsSection
      :title="mockData.benefits.title"
      :benefits="mockData.benefits.items"
      :cta-text="mockData.benefits.ctaText"
      :cta-button-text="mockData.benefits.ctaButtonText"
      @cta-click="handleCtaClick"
    />
  </div>
</template>

<script setup>
import FaqSection from './components/sections/FaqSection.vue'
import HowWeWorkSection from './components/sections/HowWeWorkSection.vue'
import ExpertiseSection from './components/sections/ExpertiseSection.vue'
import CasesSection from './components/sections/CasesSection.vue'
import ReviewsSection from './components/sections/ReviewsSection.vue'
import BenefitsSection from './components/sections/BenefitsSection.vue'

// Моковые данные для всех секций
const mockData = {
  faq: {
    title: 'Частые вопросы',
    items: [
    {
      question: 'Сколько стоит работа с тобой?',
      answer: 'Всё зависит от масштаба задачи и потребностей. Я работаю по часам, с оплатой за объем или full-time контракт: полная гибкость и прозрачность. Если речь про UX-аудит, редизайн или полное проектирование продукта, я предложу диапазон после короткого звонка. Моя цель — чтобы вы понимали бюджет заранее, без сюрпризов и скрытых доплат'
    },
    {
      question: 'Можно ли начать с небольшой задачи?',
      answer: 'Конечно. Мы можем начать с пилотного этапа — например, с редизайна одного сценария, лендинга или UX-аудита. Это даст вам понимание подхода и качества работы без больших вложений. Если всё устраивает, масштабируем дальше'
    },
    {
      question: 'Как быстро можем начать?',
      answer: 'Обычно в течение 1-3 дней после обсуждения задачи. Я держу график гибким, чтобы быстро включаться в работу. Часто уже через неделю у вас на руках первый результат'
    },
    {
      question: 'Ты работаешь один или у тебя команда?',
      answer: 'Я работаю сам, но при необходимости подключаю проверенных коллег — дизайнеров, аналитиков, иллюстраторов или разработчиков.\nВы всё равно общаетесь напрямую со мной, без прослоек и менеджеров. Так сохраняется контроль качества и скорость решений'
    },
    {
      question: 'Чем ты отличаешься от агентства или найма дизайнера в штат?',
      answer: 'Агентства часто работают по шаблону и растягивают коммуникацию. Штатный дизайнер требует адаптации и жесткого управления.\nСо мной проще: вы общаетесь напрямую, решения принимаются быстро, а результат измерим — без потери качества и структуры'
    },
    {
      question: 'Какие гарантии ты даёшь?',
      answer: 'Я не про просто "красивый дизайн". Моя цель — улучшить показатели продукта: конверсию, удержание, пользовательский опыт.\nЯ вдохновляюсь продуктами, где могу реально повлиять на метрики, и сопровождаю после внедрения'
    },
    {
      question: 'Где ты и работаешь ли с зарубежными компаниями?',
      answer: 'Я нахожусь на Бали, но у меня большой опыт с бизнесом из СНГ, США и Европы. Онлайн формат, уверенная коммуникация на английском, оплата в любой валюте или крипто. Всегда подстраиваюсь под ваш часовой пояс и формат встреч'
    },
    {
      question: 'Берешься за стартапы или за крупные компании?',
      answer: 'Большой опыт и с теми, и с другими. Главное — чтобы был внятный продукт и цели, к которым дизайн может реально помочь прийти.\nВ стартапах я часто помогаю выстроить дизайн и процесс с нуля, в зрелых компаниях — оптимизирую и развиваю'
    }
    ]
  },
  howWeWork: {
    title: 'Как мы будем работать',
    items: [
      {
        icon: 'https://www.figma.com/api/mcp/asset/172c286c-d8df-4dd2-81be-65b365566a20',
        title: 'Старт',
        description: 'Разберу проблемы, вижн и цели. Проведу анализ и сформирую роадмап'
      },
      {
        icon: 'https://www.figma.com/api/mcp/asset/409b671b-8afd-448f-974d-b671c0a33526',
        title: 'Задачи',
        description: 'Заведу, отприоритизирую и актуализирую задачи и статусы в JIRA/Notion/Slack'
      },
      {
        icon: 'https://www.figma.com/api/mcp/asset/ff852c15-8d92-4e8a-af41-75fc883343b7',
        title: 'Скорость',
        description: 'В разы быстрее, чем у обычного дизайнера. Использую AI, горячие клавиши и инструменты автоматизации'
      },
      {
        icon: 'https://www.figma.com/api/mcp/asset/ba81415a-31c0-4d40-b62f-566842ae126c',
        title: 'Передача',
        description: 'Тщательно проработаю макеты с edge cases, подготовлю анимации, ассеты и гайды в Figma/Notion'
      },
      {
        icon: 'https://www.figma.com/api/mcp/asset/c73852da-566d-415e-8bf9-4c977bd309bc',
        title: 'Автономность',
        description: 'Самостоятельно организую работу, найм и закрою задачи не отвлекая ресурсы команды'
      },
      {
        icon: 'https://www.figma.com/api/mcp/asset/51ac48f3-55e9-42b5-9dda-e986b42dd7f7',
        title: 'Кругозор',
        description: 'Запущу целые продукты как в качестве единственного дизайнера-визионера, так и в составе сложных команд'
      },
      {
        icon: 'https://www.figma.com/api/mcp/asset/a8b6b7b8-c255-49cc-a3d9-b270cdce76d2',
        title: 'Системность',
        description: 'Предоставлю решения от иконок и графики до дизайн-систем и готовых к разработке продуктов'
      },
      {
        icon: 'https://www.figma.com/api/mcp/asset/475a404e-9148-44bb-a747-b7c16f6989d8',
        title: 'Сопровождение',
        description: 'Тщательно проконтролирую разработку и доведу до идеального результата'
      }
    ]
  },
  expertise: {
    title: 'Команда в одном эксперте',
    subtitle: 'Получите не просто дизайнера, а партнера, который заботится о бизнесе и совмещает функции целой команды',
    items: [
      {
        title: 'Дизайнер',
        description: 'Создаю удобный и красивый продукт',
        items: ['Maкеты в Figma', 'Документация в Notion', 'Сопровождение разработки']
      },
      {
        title: 'Дизайн-лид',
        description: 'Выстраиваю процесс и стандарты качества',
        items: ['Дизайн-ревью', 'Менторство и развитие', 'Найм и онбординг']
      },
      {
        title: 'Продакт',
        description: 'Связь аналитики, продажи и маркетинга',
        items: ['Задачи в JIRA', 'Оценка и приоритезация', 'Фичи и роадмап']
      },
      {
        title: 'Аналитик',
        description: 'Анализ метрик, гипотез на чистом кофеине',
        items: ['Анализ рынка', 'Конкретные цели', 'A/B тесты']
      }
    ]
  },
  cases: {
    title: 'Кейсы',
    subtitle: 'Некоторые из моих историй, которые точно не оставят равнодушным',
    items: [
      {
        title: 'AG1',
        description: 'Раскрою секрет успеха в Sports Nutririon по подписке',
        image: ''
      },
      {
        title: 'AdGuard Wallet',
        description: 'Как защитить свои криптоактивы c помощью передовых подходов в Fintech',
        image: ''
      },
      {
        title: '4Real',
        description: 'iGaming, который действительно вовлекает',
        image: ''
      },
      {
        title: 'Legaline',
        description: 'eCommerce площадка в сфере Legal Law',
        image: ''
      }
    ]
  },
  reviews: {
    title: 'Самые теплые слова',
    subtitle: 'Я дорожу репутацией коллег и бизнеса, поэтому вы всегда можете быть уверены в нашем сотрудничестве',
    items: [
      {
        text: 'У нас теперь просто потрясающая дизайн-система',
        author: 'Ник Боус, дизайн-директор AG1',
        image: ''
      },
      {
        text: 'Впервые вижу такую скорость запуска продуктов',
        author: 'Игорь Лукьянов, CEO AdGuard',
        image: ''
      },
      {
        text: 'Лучший дизайнер, с которым довелось работать',
        author: 'Мухаммед Гафаров, CEO Futurebox',
        image: ''
      },
      {
        text: 'Привет, Егор! Спасибо за отличный дизайн для Legaline',
        author: 'Дмитрий Грин, партнер Legaline',
        image: ''
      }
    ]
  },
  benefits: {
    title: 'Что нас ждет впереди',
    items: [
      { text: 'Запустим продукт за 1–3 месяца без остановки текущей работы' },
      { text: 'Создадим с нуля или переработаем интерфейсы с улучшением метрик' },
      { text: 'Создадим гибкую дизайн-систему по всем современным стандартам для ускорения разработки' },
      { text: 'Создадим гайды и спеки для лучшего масштабирования' }
    ],
    ctaText: 'Готовы перейти на новый уровень?',
    ctaButtonText: 'Познакомиться'
  }
}

const handleCtaClick = () => {
  console.log('CTA clicked')
}
</script>

