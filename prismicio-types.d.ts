// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *Chat → Default Questions*
 */
export interface ChatDocumentDataDefaultQuestionsItem {
  /**
   * Question field in *Chat → Default Questions*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: chat.default_questions[].question
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  question: prismic.KeyTextField;
}

/**
 * Content for Chat documents
 */
interface ChatDocumentData {
  /**
   * Enabled field in *Chat*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: chat.enabled
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  enabled: prismic.BooleanField;

  /**
   * Default Questions field in *Chat*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: chat.default_questions[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  default_questions: prismic.GroupField<
    Simplify<ChatDocumentDataDefaultQuestionsItem>
  >;

  /**
   * Title field in *Chat*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: chat.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Description field in *Chat*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: chat.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  description: prismic.KeyTextField;

  /**
   * Label field in *Chat*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: chat.label
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;

  /**
   * Input Placeholder field in *Chat*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: chat.input_placeholder
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  input_placeholder: prismic.KeyTextField;
}

/**
 * Chat document from Prismic
 *
 * - **API ID**: `chat`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ChatDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<ChatDocumentData>, 'chat', Lang>;

/**
 * Item in *Footer → Links*
 */
export interface FooterDocumentDataLinksItem {
  /**
   * Link field in *Footer → Links*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.links[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Name field in *Footer → Links*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.links[].name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;
}

/**
 * Content for Footer documents
 */
interface FooterDocumentData {
  /**
   * Name field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;

  /**
   * Role field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.role
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  role: prismic.KeyTextField;

  /**
   * Links field in *Footer*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.links[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  links: prismic.GroupField<Simplify<FooterDocumentDataLinksItem>>;

  /**
   * Logo field in *Footer*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;
}

/**
 * Footer document from Prismic
 *
 * - **API ID**: `footer`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FooterDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<FooterDocumentData>,
    'footer',
    Lang
  >;

type HomeDocumentDataSlicesSlice =
  | ProjectsSlice
  | SliderSlice
  | AboutSlice
  | HeroSlice;

/**
 * Content for Home documents
 */
interface HomeDocumentData {
  /**
   * Slice Zone field in *Home*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: home.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomeDocumentDataSlicesSlice> /**
   * Meta Description field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: home.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Home*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: home.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: home.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, 'home', Lang>;

/**
 * Content for Navbar documents
 */
interface NavbarDocumentData {
  /**
   * Logo field in *Navbar*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: navbar.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;
}

/**
 * Navbar document from Prismic
 *
 * - **API ID**: `navbar`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavbarDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<NavbarDocumentData>,
    'navbar',
    Lang
  >;

type ProjectDocumentDataSlicesSlice =
  | ContentSlice
  | AboutSlice
  | SliderSlice
  | ProjectHeroSlice;

/**
 * Content for Project documents
 */
interface ProjectDocumentData {
  /**
   * Slice Zone field in *Project*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: project.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ProjectDocumentDataSlicesSlice> /**
   * Meta Title field in *Project*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: project.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Project*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: project.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Project*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: project.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Project document from Prismic
 *
 * - **API ID**: `project`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProjectDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ProjectDocumentData>,
    'project',
    Lang
  >;

/**
 * Content for Tech documents
 */
interface TechDocumentData {
  /**
   * Link field in *Tech*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: tech.link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Logo field in *Tech*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: tech.logo
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  logo: prismic.ImageField<never>;

  /**
   * Should Invert field in *Tech*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: tech.should_invert
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  should_invert: prismic.BooleanField;
}

/**
 * Tech document from Prismic
 *
 * - **API ID**: `tech`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type TechDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<TechDocumentData>, 'tech', Lang>;

export type AllDocumentTypes =
  | ChatDocument
  | FooterDocument
  | HomeDocument
  | NavbarDocument
  | ProjectDocument
  | TechDocument;

/**
 * Item in *TextBlock → With Buttons → Primary → Buttons*
 */
export interface AboutSliceWithButtonsPrimaryButtonsItem {
  /**
   * Text field in *TextBlock → With Buttons → Primary → Buttons*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withButtons.primary.buttons[].text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  text: prismic.KeyTextField;

  /**
   * Hover Text field in *TextBlock → With Buttons → Primary → Buttons*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withButtons.primary.buttons[].hover_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  hover_text: prismic.KeyTextField;

  /**
   * Link field in *TextBlock → With Buttons → Primary → Buttons*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withButtons.primary.buttons[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;
}

/**
 * Item in *TextBlock → With Stats → Primary → Stats*
 */
export interface AboutSliceWithStatsPrimaryStatsItem {
  /**
   * Label field in *TextBlock → With Stats → Primary → Stats*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withStats.primary.stats[].label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;

  /**
   * Link field in *TextBlock → With Stats → Primary → Stats*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withStats.primary.stats[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Value field in *TextBlock → With Stats → Primary → Stats*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withStats.primary.stats[].value
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  value: prismic.KeyTextField;

  /**
   * Text or Link field in *TextBlock → With Stats → Primary → Stats*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **Default Value**: Text
   * - **API ID Path**: about.withStats.primary.stats[].text_or_link
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  text_or_link: prismic.SelectField<'Text' | 'Link', 'filled'>;
}

/**
 * Primary content in *TextBlock → Default → Primary*
 */
export interface AboutSliceDefaultPrimary {
  /**
   * Description field in *TextBlock → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.default.primary.description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Title field in *TextBlock → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Full Width field in *TextBlock → Default → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: true
   * - **API ID Path**: about.default.primary.full_width
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  full_width: prismic.BooleanField;
}

/**
 * Default variation for TextBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AboutSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<AboutSliceDefaultPrimary>,
  never
>;

/**
 * Primary content in *TextBlock → With Buttons → Primary*
 */
export interface AboutSliceWithButtonsPrimary {
  /**
   * Title field in *TextBlock → With Buttons → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withButtons.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Description field in *TextBlock → With Buttons → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withButtons.primary.description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Full Width field in *TextBlock → With Buttons → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: true
   * - **API ID Path**: about.withButtons.primary.full_width
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  full_width: prismic.BooleanField;

  /**
   * Buttons field in *TextBlock → With Buttons → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withButtons.primary.buttons[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  buttons: prismic.GroupField<
    Simplify<AboutSliceWithButtonsPrimaryButtonsItem>
  >;
}

/**
 * With Buttons variation for TextBlock Slice
 *
 * - **API ID**: `withButtons`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AboutSliceWithButtons = prismic.SharedSliceVariation<
  'withButtons',
  Simplify<AboutSliceWithButtonsPrimary>,
  never
>;

/**
 * Primary content in *TextBlock → With Stats → Primary*
 */
export interface AboutSliceWithStatsPrimary {
  /**
   * description field in *TextBlock → With Stats → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withStats.primary.description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * title field in *TextBlock → With Stats → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withStats.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Full Width field in *TextBlock → With Stats → Primary*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: true
   * - **API ID Path**: about.withStats.primary.full_width
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  full_width: prismic.BooleanField;

  /**
   * Stats field in *TextBlock → With Stats → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: about.withStats.primary.stats[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  stats: prismic.GroupField<Simplify<AboutSliceWithStatsPrimaryStatsItem>>;
}

/**
 * With Stats variation for TextBlock Slice
 *
 * - **API ID**: `withStats`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AboutSliceWithStats = prismic.SharedSliceVariation<
  'withStats',
  Simplify<AboutSliceWithStatsPrimary>,
  never
>;

/**
 * Slice variation for *TextBlock*
 */
type AboutSliceVariation =
  | AboutSliceDefault
  | AboutSliceWithButtons
  | AboutSliceWithStats;

/**
 * TextBlock Shared Slice
 *
 * - **API ID**: `about`
 * - **Description**: About
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type AboutSlice = prismic.SharedSlice<'about', AboutSliceVariation>;

/**
 * Primary content in *Content → Default → Primary*
 */
export interface ContentSliceDefaultPrimary {
  /**
   * Title field in *Content → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: content.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Content field in *Content → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: content.default.primary.content
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  content: prismic.RichTextField;
}

/**
 * Default variation for Content Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ContentSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Content*
 */
type ContentSliceVariation = ContentSliceDefault;

/**
 * Content Shared Slice
 *
 * - **API ID**: `content`
 * - **Description**: Content
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ContentSlice = prismic.SharedSlice<
  'content',
  ContentSliceVariation
>;

/**
 * Item in *Hero → Default → Primary → Icons*
 */
export interface HeroSliceDefaultPrimaryIconsItem {
  /**
   * Image field in *Hero → Default → Primary → Icons*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.icons[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Split Word field in *Hero → Default → Primary → Icons*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.icons[].split_word
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  split_word: prismic.KeyTextField;

  /**
   * Link field in *Hero → Default → Primary → Icons*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.icons[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Should Invert field in *Hero → Default → Primary → Icons*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: hero.default.primary.icons[].should_invert
   * - **Documentation**: https://prismic.io/docs/field#boolean
   */
  should_invert: prismic.BooleanField;
}

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
  /**
   * First Name field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.firstname
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  firstname: prismic.KeyTextField;

  /**
   * Last Name field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.lastname
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  lastname: prismic.KeyTextField;

  /**
   * Avatar field in *Hero → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.avatar
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  avatar: prismic.ImageField<never>;

  /**
   * Role field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.role
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  role: prismic.KeyTextField;

  /**
   * Button Text field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.button_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  button_text: prismic.KeyTextField;

  /**
   * Button Hover Text field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.button_hover_text
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  button_hover_text: prismic.KeyTextField;

  /**
   * Tagline field in *Hero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.tagline
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  tagline: prismic.KeyTextField;

  /**
   * Icons field in *Hero → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.icons[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  icons: prismic.GroupField<Simplify<HeroSliceDefaultPrimaryIconsItem>>;

  /**
   * Link field in *Hero → Default → Primary*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: hero.default.primary.link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<HeroSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault;

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSlice = prismic.SharedSlice<'hero', HeroSliceVariation>;

/**
 * Primary content in *ProjectHero → Default → Primary*
 */
export interface ProjectHeroSliceDefaultPrimary {
  /**
   * Content field in *ProjectHero → Default → Primary*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: *None*
   * - **API ID Path**: project_hero.default.primary.content
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  content: prismic.LinkToMediaField;

  /**
   * Title field in *ProjectHero → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: project_hero.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Year field in *ProjectHero → Default → Primary*
   *
   * - **Field Type**: Number
   * - **Placeholder**: *None*
   * - **API ID Path**: project_hero.default.primary.year
   * - **Documentation**: https://prismic.io/docs/field#number
   */
  year: prismic.NumberField;
}

/**
 * Default variation for ProjectHero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProjectHeroSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ProjectHeroSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ProjectHero*
 */
type ProjectHeroSliceVariation = ProjectHeroSliceDefault;

/**
 * ProjectHero Shared Slice
 *
 * - **API ID**: `project_hero`
 * - **Description**: ProjectHero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProjectHeroSlice = prismic.SharedSlice<
  'project_hero',
  ProjectHeroSliceVariation
>;

/**
 * Item in *Projects → Default → Primary → Projects*
 */
export interface ProjectsSliceDefaultPrimaryProjectsItem {
  /**
   * Image field in *Projects → Default → Primary → Projects*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: projects.default.primary.projects[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;

  /**
   * Name field in *Projects → Default → Primary → Projects*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: projects.default.primary.projects[].name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;

  /**
   * Link field in *Projects → Default → Primary → Projects*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: projects.default.primary.projects[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField;

  /**
   * Type field in *Projects → Default → Primary → Projects*
   *
   * - **Field Type**: Select
   * - **Placeholder**: *None*
   * - **Default Value**: Web Application
   * - **API ID Path**: projects.default.primary.projects[].type
   * - **Documentation**: https://prismic.io/docs/field#select
   */
  type: prismic.SelectField<
    'Web Application' | 'Library' | 'Design' | 'Website' | 'VS Code Extension',
    'filled'
  >;
}

/**
 * Primary content in *Projects → Default → Primary*
 */
export interface ProjectsSliceDefaultPrimary {
  /**
   * Projects field in *Projects → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: projects.default.primary.projects[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  projects: prismic.GroupField<
    Simplify<ProjectsSliceDefaultPrimaryProjectsItem>
  >;

  /**
   * Title field in *Projects → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: projects.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;
}

/**
 * Default variation for Projects Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProjectsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ProjectsSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Projects*
 */
type ProjectsSliceVariation = ProjectsSliceDefault;

/**
 * Projects Shared Slice
 *
 * - **API ID**: `projects`
 * - **Description**: Projects
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProjectsSlice = prismic.SharedSlice<
  'projects',
  ProjectsSliceVariation
>;

/**
 * Item in *Slider → Default → Primary → Items*
 */
export interface SliderSliceDefaultPrimaryItemsItem {
  /**
   * Tech field in *Slider → Default → Primary → Items*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: slider.default.primary.items[].tech
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  tech: prismic.ContentRelationshipField<'tech'>;
}

/**
 * Primary content in *Slider → Default → Primary*
 */
export interface SliderSliceDefaultPrimary {
  /**
   * Title field in *Slider → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: slider.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Items field in *Slider → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: slider.default.primary.items[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  items: prismic.GroupField<Simplify<SliderSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for Slider Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SliderSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<SliderSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Slider*
 */
type SliderSliceVariation = SliderSliceDefault;

/**
 * Slider Shared Slice
 *
 * - **API ID**: `slider`
 * - **Description**: Slider
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SliderSlice = prismic.SharedSlice<'slider', SliderSliceVariation>;

declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      ChatDocument,
      ChatDocumentData,
      ChatDocumentDataDefaultQuestionsItem,
      FooterDocument,
      FooterDocumentData,
      FooterDocumentDataLinksItem,
      HomeDocument,
      HomeDocumentData,
      HomeDocumentDataSlicesSlice,
      NavbarDocument,
      NavbarDocumentData,
      ProjectDocument,
      ProjectDocumentData,
      ProjectDocumentDataSlicesSlice,
      TechDocument,
      TechDocumentData,
      AllDocumentTypes,
      AboutSlice,
      AboutSliceDefaultPrimary,
      AboutSliceWithButtonsPrimaryButtonsItem,
      AboutSliceWithButtonsPrimary,
      AboutSliceWithStatsPrimaryStatsItem,
      AboutSliceWithStatsPrimary,
      AboutSliceVariation,
      AboutSliceDefault,
      AboutSliceWithButtons,
      AboutSliceWithStats,
      ContentSlice,
      ContentSliceDefaultPrimary,
      ContentSliceVariation,
      ContentSliceDefault,
      HeroSlice,
      HeroSliceDefaultPrimaryIconsItem,
      HeroSliceDefaultPrimary,
      HeroSliceVariation,
      HeroSliceDefault,
      ProjectHeroSlice,
      ProjectHeroSliceDefaultPrimary,
      ProjectHeroSliceVariation,
      ProjectHeroSliceDefault,
      ProjectsSlice,
      ProjectsSliceDefaultPrimaryProjectsItem,
      ProjectsSliceDefaultPrimary,
      ProjectsSliceVariation,
      ProjectsSliceDefault,
      SliderSlice,
      SliderSliceDefaultPrimaryItemsItem,
      SliderSliceDefaultPrimary,
      SliderSliceVariation,
      SliderSliceDefault,
    };
  }
}
