/** 博客列表项（与后端 JSON 字段一一对应，蛇形命名） */
export interface BlogPost {
  title: string;
  slug: string;
  summary: string;
  created_at: string;
  /** 详情接口才返回完整内容 */
  content?: string;
  cover_image?: string;
  tags?: string[];
  updated_at?: string;
}
