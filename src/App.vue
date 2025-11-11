<template>
  <div id="app" class="min-h-screen">
    <!-- Hero секция -->
    <HeroSection
      :title="mockData.hero.title"
      :subtitle="mockData.hero.subtitle"
      :highlight-text="mockData.hero.highlightText"
      :highlight-avatars="mockData.hero.highlightAvatars"
      :button-text="mockData.hero.buttonText"
      :stats="mockData.hero.stats"
      :gallery="mockData.hero.gallery"
      @cta-click="handleHeroCtaClick"
    />

    <!-- Tools (Dark) -->
    <ToolsSection
      :title="mockData.tools.title"
      :content="mockData.tools.content"
      :items="mockData.tools.items"
    />

    
    <!-- Cases Секция -->
    <CasesSection
      :title="mockData.cases.title"
      :subtitle="mockData.cases.subtitle"
      :cases="mockData.cases.items"
    />
    
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


    <!-- Opportunities Секция -->
    <OpportunitiesSection
      :title="mockData.opportunities.title"
      :subtitle="mockData.opportunities.subtitle"
      :opportunities="mockData.opportunities.items"
      :footer-text1="mockData.opportunities.footerText1"
      :footer-text2="mockData.opportunities.footerText2"
      :button-text="mockData.opportunities.buttonText"
      @figma-click="handleFigmaClick"
    />

    <!-- Reviews Секция -->
    <ReviewsSection
      :title="mockData.reviews.title"
      :subtitle="mockData.reviews.subtitle"
      :reviews="mockData.reviews.items"
    />

    <!-- FAQ Секция -->
    <FaqSection :title="mockData.faq.title" :faq-items="mockData.faq.items" />

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
import FaqSection from "./components/sections/FaqSection.vue";
import HeroSection from "./components/sections/HeroSection.vue";
import HowWeWorkSection from "./components/sections/HowWeWorkSection.vue";
import ExpertiseSection from "./components/sections/ExpertiseSection.vue";
import CasesSection from "./components/sections/CasesSection.vue";
import OpportunitiesSection from "./components/sections/OpportunitiesSection.vue";
import ReviewsSection from "./components/sections/ReviewsSection.vue";
import BenefitsSection from "./components/sections/BenefitsSection.vue";
import ToolsSection from "./components/sections/ToolsSection.vue";

// Иконки How We Work (локальные SVG)
import iconStart from "./assets/icons/howwework/start.svg";
import iconTasks from "./assets/icons/howwework/tasks.svg";
import iconSpeed from "./assets/icons/howwework/speed.svg";
import iconTransfer from "./assets/icons/howwework/transfer.svg";
import iconAutonomy from "./assets/icons/howwework/autonomy.svg";
import iconOutlook from "./assets/icons/howwework/outlook.svg";
import iconSystem from "./assets/icons/howwework/system.svg";
import iconSupport from "./assets/icons/howwework/support.svg";

// Иконки секции "Результат, а не процесс"
import iconExperienceStartups from "./assets/icons/tools/experience-startups.svg";
import iconExperienceIndustries from "./assets/icons/tools/experience-industries.svg";
import iconExperiencePlatforms from "./assets/icons/tools/experience-platforms.svg";
import iconCollaboration from "./assets/icons/tools/collaboration.svg";
import iconSelfOrganization from "./assets/icons/tools/self-organization.svg";
import iconTransparency from "./assets/icons/tools/transparency.svg";

// Аватары Hero
import avatar1 from "./assets/avatars/avatar-1.png";
import avatar2 from "./assets/avatars/avatar-2.png";
import avatar3 from "./assets/avatars/avatar-3.png";

// Моковые данные для всех секций
const mockData = {
  hero: {
    title: "Привет, это Егор.",
    subtitle: "Я помог десяткам топовых команд повысить прибыль за счет дизайна",
    highlightText: "32+ млн со всего мира ценят мой UX",
    highlightAvatars: [
      { src: avatar1, alt: "Лицо пользователя 1" },
      { src: avatar2, alt: "Лицо пользователя 2" },
      { src: avatar3, alt: "Лицо пользователя 3" },
    ],
    buttonText: "Познакомиться",
    stats: [
      { value: "30+", description: "запущенных проектов — от MVP до масштабных редизайнов" },
      { value: "7+", description: "лет в продуктовых командах из множества индустрий" },
      { value: "3", description: "дня на первый продукт или фичу" },
      { value: "+12.6%", description: "к доходу — средний эффект от улучшений дизайна" },
    ],
    gallery: [{ src: avatar1 }, { src: avatar2 }, { src: avatar3 }],
  },
  faq: {
    title: "Частые вопросы",
    items: [
      {
        question: "Сколько стоит работа с тобой?",
        answer:
          "Всё зависит от масштаба задачи и потребностей. Я работаю по часам, с оплатой за объем или full-time контракт: полная гибкость и прозрачность. Если речь про UX-аудит, редизайн или полное проектирование продукта, я предложу диапазон после короткого звонка. Моя цель — чтобы вы понимали бюджет заранее, без сюрпризов и скрытых доплат",
      },
      {
        question: "Можно ли начать с небольшой задачи?",
        answer:
          "Конечно. Мы можем начать с пилотного этапа — например, с редизайна одного сценария, лендинга или UX-аудита. Это даст вам понимание подхода и качества работы без больших вложений. Если всё устраивает, масштабируем дальше",
      },
      {
        question: "Как быстро можем начать?",
        answer:
          "Обычно в течение 1-3 дней после обсуждения задачи. Я держу график гибким, чтобы быстро включаться в работу. Часто уже через неделю у вас на руках первый результат",
      },
      {
        question: "Ты работаешь один или у тебя команда?",
        answer:
          "Я работаю сам, но при необходимости подключаю проверенных коллег — дизайнеров, аналитиков, иллюстраторов или разработчиков.\nВы всё равно общаетесь напрямую со мной, без прослоек и менеджеров. Так сохраняется контроль качества и скорость решений",
      },
      {
        question: "Чем ты отличаешься от агентства или найма дизайнера в штат?",
        answer:
          "Агентства часто работают по шаблону и растягивают коммуникацию. Штатный дизайнер требует адаптации и жесткого управления.\nСо мной проще: вы общаетесь напрямую, решения принимаются быстро, а результат измерим — без потери качества и структуры",
      },
      {
        question: "Какие гарантии ты даёшь?",
        answer:
          'Я не про просто "красивый дизайн". Моя цель — улучшить показатели продукта: конверсию, удержание, пользовательский опыт.\nЯ вдохновляюсь продуктами, где могу реально повлиять на метрики, и сопровождаю после внедрения',
      },
      {
        question: "Где ты и работаешь ли с зарубежными компаниями?",
        answer:
          "Я нахожусь на Бали, но у меня большой опыт с бизнесом из СНГ, США и Европы. Онлайн формат, уверенная коммуникация на английском, оплата в любой валюте или крипто. Всегда подстраиваюсь под ваш часовой пояс и формат встреч",
      },
      {
        question: "Берешься за стартапы или за крупные компании?",
        answer:
          "Большой опыт и с теми, и с другими. Главное — чтобы был внятный продукт и цели, к которым дизайн может реально помочь прийти.\nВ стартапах я часто помогаю выстроить дизайн и процесс с нуля, в зрелых компаниях — оптимизирую и развиваю",
      },
    ],
  },
  howWeWork: {
    title: "Как мы будем работать",
    items: [
      {
        icon: iconStart,
        title: "Старт",
        description:
          "Разберу проблемы, вижн и цели. Проведу анализ и сформирую роадмап",
      },
      {
        icon: iconTasks,
        title: "Задачи",
        description:
          "Заведу, отприоритизирую и актуализирую задачи и статусы в JIRA/Notion/Slack",
      },
      {
        icon: iconSpeed,
        title: "Скорость",
        description:
          "В разы быстрее, чем у обычного дизайнера. Использую AI, горячие клавиши и инструменты автоматизации",
      },
      {
        icon: iconTransfer,
        title: "Передача",
        description:
          "Тщательно проработаю макеты с edge cases, подготовлю анимации, ассеты и гайды в Figma/Notion",
      },
      {
        icon: iconAutonomy,
        title: "Автономность",
        description:
          "Самостоятельно организую работу, найм и закрою задачи не отвлекая ресурсы команды",
      },
      {
        icon: iconOutlook,
        title: "Кругозор",
        description:
          "Запущу целые продукты как в качестве единственного дизайнера-визионера, так и в составе сложных команд",
      },
      {
        icon: iconSystem,
        title: "Системность",
        description:
          "Предоставлю решения от иконок и графики до дизайн-систем и готовых к разработке продуктов",
      },
      {
        icon: iconSupport,
        title: "Сопровождение",
        description:
          "Тщательно проконтролирую разработку и доведу до идеального результата",
      },
    ],
  },
  expertise: {
    title: "Команда в одном эксперте",
    subtitle:
      "Получите не просто дизайнера, а партнера, который заботится о бизнесе и совмещает функции целой команды",
    items: [
      {
        title: "Дизайнер",
        description: "Создаю удобный и красивый продукт",
        items: [
          "Maкеты в Figma",
          "Документация в Notion",
          "Сопровождение разработки",
        ],
      },
      {
        title: "Дизайн-лид",
        description: "Выстраиваю процесс и стандарты качества",
        items: ["Дизайн-ревью", "Менторство и развитие", "Найм и онбординг"],
      },
      {
        title: "Продакт",
        description: "Связь аналитики, продажи и маркетинга",
        items: ["Задачи в JIRA", "Оценка и приоритезация", "Фичи и роадмап"],
      },
      {
        title: "Аналитик",
        description: "Анализ метрик, гипотез на чистом кофеине",
        items: ["Анализ рынка", "Конкретные цели", "A/B тесты"],
      },
    ],
  },
  cases: {
    title: "Кейсы",
    subtitle: "Некоторые из моих историй, которые точно не оставят равнодушным",
    items: [
      {
        title: "AG1",
        description: "Раскрою секрет успеха в Sports Nutririon по подписке",
        image: "",
      },
      {
        title: "AdGuard Wallet",
        description:
          "Как защитить свои криптоактивы c помощью передовых подходов в Fintech",
        image: "",
      },
      {
        title: "4Real",
        description: "iGaming, который действительно вовлекает",
        image: "",
      },
      {
        title: "Legaline",
        description: "eCommerce площадка в сфере Legal Law",
        image: "",
      },
    ],
  },
  tools: {
    title: "Результат, а не процесс",
    content: {
      question: "Как я работаю?",
      columns: [
        "Моя философия – это работа win-win-win, где все выигрывают от нашего сотрудничества: прибыль бизнеса повышается, клиенты довольны",
        "Ну а я получаю не только справедливое вознаграждение, основанное на результатах работы, но и расту вместе с командой"
      ]
    },
    items: [
      { icon: iconExperienceStartups, text: "Опыт от стартапов до экосистем крупных компаний" },
      { icon: iconExperienceIndustries, text: "Опыт во множестве индустрий: FinTech, eCommerce, iGaming, AI, Cloud Services" },
      { icon: iconExperiencePlatforms, text: "Большой опыт со всеми платформами: Web/mobile, iOS, Android" },
      { icon: iconCollaboration, text: "Работаю напрямую с командой разработки и PM" },
      { icon: iconSelfOrganization, text: "Самостоятельно организую всю работу от анализа до сдачи релиза" },
      { icon: iconTransparency, text: "Формирую сроки, цели и KPI, чтобы сотрудничество было прозрачным" },
    ]
  },
  opportunities: {
    title: "Какие возможности вы получите",
    subtitle: "Для тех, кто любит подушнить",
    items: [
      {
        category: "Задачи",
        description:
          "Приоритизация и планирование в JIRA\nСпринты, сроки, оценка и контроль скорости\nДейли, ретро, демо, 1×1 — всё по канону продуктовых циклов",
      },
      {
        category: "Прило",
        description:
          "Конструктивное взаимодействие с дизайнером\nЛюбовь раз — Figma — и отправлен Фидбеком!\nБезперебойная Разработка конверсии",
      },
      {
        category: "Аналитика",
        description:
          "Анализ рынка и конкурентной среды\nОформление гипотез, плане ТЗХ ТДХ, Минус ОК Экперименты СХОД ПРО\nМониторинг активности и редизайн",
      },
      {
        category: "Разработка",
        description:
          "Контроль pixel-perfect реализации\nТестирование сценариев, поиск ошибок\nПроверка верстки на pixel perfect",
      },
      {
        category: "Nitrix",
        description:
          "Спецификации для дизайна и разработки\nПодготовка ассетов, передача макетов\nДокументация и гайдлайны",
      },
      {
        category: "Другое",
        description:
          "И ряд смежных дисциплин\nОт графики к анимации\nКачественно без лишнего",
      },
    ],
    footerText1:
      "Для тех, кто хочет копнуть глубже —\nя открыл доступ к Figma-файлу с дизайном этого сайта",
    footerText2:
      "Там можно посмотреть структуру проекта, токены, компоненты, сетки и прикрепленные комментарии",
    buttonText: "Смотреть в Figma",
  },
  reviews: {
    title: "Самые теплые слова",
    subtitle:
      "Я дорожу репутацией коллег и бизнеса, поэтому вы всегда можете быть уверены в нашем сотрудничестве",
    items: [
      {
        text: "У нас теперь просто потрясающая дизайн-система",
        author: "Ник Боус, дизайн-директор AG1",
        image: "",
      },
      {
        text: "Впервые вижу такую скорость запуска продуктов",
        author: "Игорь Лукьянов, CEO AdGuard",
        image: "",
      },
      {
        text: "Лучший дизайнер, с которым довелось работать",
        author: "Мухаммед Гафаров, CEO Futurebox",
        image: "",
      },
      {
        text: "Привет, Егор! Спасибо за отличный дизайн для Legaline",
        author: "Дмитрий Грин, партнер Legaline",
        image: "",
      },
    ],
  },
  benefits: {
    title: "Что нас ждет впереди",
    items: [
      { text: "Запустим продукт за 1–3 месяца без остановки текущей работы" },
      {
        text: "Создадим с нуля или переработаем интерфейсы с улучшением метрик",
      },
      {
        text: "Создадим гибкую дизайн-систему по всем современным стандартам для ускорения разработки",
      },
      { text: "Создадим гайды и спеки для лучшего масштабирования" },
    ],
    ctaText: "Готовы перейти на новый уровень?",
    ctaButtonText: "Познакомиться",
  },
};

const handleCtaClick = () => {
  console.log("CTA clicked");
};

const handleHeroCtaClick = () => {
  console.log("Hero CTA clicked");
};

const handleFigmaClick = () => {
  window.open(
    "https://www.figma.com/design/IYufH6FFbWEplvqjKOB6Gf/geovo",
    "_blank"
  );
};
</script>
