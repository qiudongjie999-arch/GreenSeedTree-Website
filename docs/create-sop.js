const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, PageNumber, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

// 创建文档
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Microsoft YaHei", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Microsoft YaHei", color: "16A34A" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Microsoft YaHei", color: "16A34A" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Microsoft YaHei" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "steps",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "步骤%1：", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 720 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ 
        children: [new TextRun({ text: "青稷树 GreenSeedTree - 网站上线SOP", size: 20, color: "666666" })],
        alignment: AlignmentType.RIGHT
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        children: [new TextRun({ text: "第 ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " 页", size: 20 })],
        alignment: AlignmentType.CENTER
      })] })
    },
    children: [
      // 封面标题
      new Paragraph({ spacing: { before: 2000 } }),
      new Paragraph({ 
        children: [new TextRun({ text: "青稷树 GreenSeedTree", size: 56, bold: true, color: "16A34A" })],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({ 
        children: [new TextRun({ text: "网站上线标准操作流程（SOP）", size: 40, bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 }
      }),
      new Paragraph({ 
        children: [new TextRun({ text: "域名：GreenSeedTree.com", size: 28, color: "666666" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 800 }
      }),
      new Paragraph({ 
        children: [new TextRun({ text: "版本：V1.0", size: 24, color: "666666" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 }
      }),
      new Paragraph({ 
        children: [new TextRun({ text: "日期：2026年4月", size: 24, color: "666666" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 }
      }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 目录
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("目录")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("项目概述")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("上线前准备工作清单")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("域名配置（腾讯云）")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("网站部署（Vercel）")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("ICP备案（工信部）")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("内容完善清单")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("SEO优化配置")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("功能对接（表单/统计）")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("测试验收清单")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("上线后维护计划")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("时间规划与里程碑")] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第一章：项目概述
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("一、项目概述")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 项目信息")] }),
      createInfoTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("1.2 上线目标")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("完成网站正式上线，可通过域名 GreenSeedTree.com 访问")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("完成ICP备案，符合中国互联网法规要求")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("网站功能完整，用户体验流畅")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("SEO基础配置完成，便于搜索引擎收录")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.3 技术架构")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("前端：HTML + Tailwind CSS（CDN）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("托管：Vercel（免费方案）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("域名：腾讯云（已购买）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("备案：工信部ICP备案")] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第二章：上线前准备工作清单
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("二、上线前准备工作清单")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 必备账号")] }),
      createAccountTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("2.2 必备材料")] }),
      createMaterialTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("2.3 网站文件检查")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("index.html - 主页面文件（已完成）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("logo-brand.png - 品牌Logo（已完成）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("favicon.ico - 网站图标（待制作）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("robots.txt - 搜索引擎爬虫规则（待创建）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("sitemap.xml - 网站地图（待创建）")] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第三章：域名配置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("三、域名配置（腾讯云）")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 登录腾讯云控制台")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("访问 https://console.cloud.tencent.com")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("使用购买域名时的账号登录")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("进入「域名注册」→「我的域名」")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("找到 GreenSeedTree.com，点击「解析」")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 添加DNS解析记录")] }),
      createDNSTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("3.3 注意事项")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("DNS解析生效时间：10分钟-48小时（通常2小时内）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Vercel的A记录和CNAME记录需要在Vercel部署后获取")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("建议先完成Vercel部署，再配置DNS")] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第四章：网站部署
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("四、网站部署（Vercel）")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 创建GitHub仓库")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("登录 GitHub（https://github.com）")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("点击右上角「+」→「New repository」")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("仓库名称：greenseedtree-website（或自定义）")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("设置为 Public（公开）")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("点击「Create repository」")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 上传网站文件到GitHub")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("在本地项目目录初始化Git：git init")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("添加所有文件：git add .")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("提交更改：git commit -m \"Initial commit\"")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("关联远程仓库：git remote add origin https://github.com/用户名/仓库名.git")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("推送到GitHub：git push -u origin main")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Vercel部署")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("访问 https://vercel.com，使用GitHub账号登录")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("点击「Add New」→「Project」")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("选择刚才创建的GitHub仓库")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("Framework Preset 选择「Other」")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("点击「Deploy」开始部署")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("等待部署完成（约1-2分钟）")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.4 绑定自定义域名")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("在Vercel项目页面，点击「Settings」→「Domains」")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("输入域名：greenseedtree.com，点击「Add」")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("同时添加：www.greenseedtree.com")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("Vercel会显示需要配置的DNS记录")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("返回腾讯云DNS解析，添加Vercel提供的记录")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("等待DNS生效后，Vercel会自动配置SSL证书")] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第五章：ICP备案
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("五、ICP备案（工信部）")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 备案必要性")] }),
      new Paragraph({ children: [new TextRun("根据《互联网信息服务管理办法》，在中国大陆提供服务的网站必须完成ICP备案。未备案的网站将无法通过国内服务器访问。")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.2 备案流程")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("登录腾讯云ICP备案系统：https://console.cloud.tencent.com/beian")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("点击「开始备案」，填写主体信息（企业/个人）")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("上传证件材料（营业执照/身份证）")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("填写网站信息（域名、网站名称、服务内容）")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("提交腾讯云初审（1-2个工作日）")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("腾讯云初审通过后，提交管局审核（5-20个工作日）")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("收到备案成功短信，获取备案号")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.3 备案所需材料")] }),
      createBeianTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.4 备案后操作")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("在网站底部添加备案号，并链接到工信部网站")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("链接地址：https://beian.miit.gov.cn")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("如使用腾讯云国内服务器，还需添加公安备案号")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.5 特别说明")] }),
      new Paragraph({ children: [new TextRun({ text: "Vercel使用的是海外服务器，理论上不需要ICP备案即可访问。但如果目标用户主要在中国大陆，建议：", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("方案A：先使用Vercel上线，后续迁移到国内服务器并备案")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("方案B：直接使用腾讯云COS+CDN（需备案）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("方案C：使用Vercel + 自定义域名（不备案，大陆访问可能较慢）")] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第六章：内容完善清单
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("六、内容完善清单")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 必须完善")] }),
      createContentTable1(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("6.2 建议完善")] }),
      createContentTable2(),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第七章：SEO优化配置
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("七、SEO优化配置")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.1 基础SEO配置")] }),
      createSEOTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("7.2 搜索引擎提交")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("百度站长平台：https://ziyuan.baidu.com")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("Google Search Console：https://search.google.com/search-console")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("添加网站并验证所有权")] }),
      new Paragraph({ numbering: { reference: "steps", level: 0 }, children: [new TextRun("提交sitemap.xml")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.3 Open Graph配置（社交分享）")] }),
      new Paragraph({ children: [new TextRun("在<head>中添加以下meta标签：")] }),
      new Paragraph({ children: [new TextRun({ text: '<meta property="og:title" content="青稷树 GreenSeedTree - AI定制化解决方案专家">', font: "Consolas", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: '<meta property="og:description" content="从需求诊断到工具落地，一站式AI定制解决方案">', font: "Consolas", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: '<meta property="og:image" content="https://greenseedtree.com/og-image.png">', font: "Consolas", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: '<meta property="og:url" content="https://greenseedtree.com">', font: "Consolas", size: 20 })] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第八章：功能对接
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("八、功能对接（表单/统计）")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8.1 表单对接方案")] }),
      createFormTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("8.2 网站统计方案")] }),
      createAnalyticsTable(),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第九章：测试验收清单
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("九、测试验收清单")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.1 功能测试")] }),
      createTestTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("9.2 兼容性测试")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Chrome浏览器（最新版）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Safari浏览器（最新版）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Firefox浏览器（最新版）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Edge浏览器（最新版）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("移动端Safari（iOS）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("移动端Chrome（Android）")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9.3 性能测试")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("使用Google PageSpeed Insights测试")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("目标：移动端评分 > 80，桌面端评分 > 90")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("测试地址：https://pagespeed.web.dev/")] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第十章：上线后维护计划
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("十、上线后维护计划")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("10.1 日常维护")] }),
      createMaintenanceTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("10.2 内容更新计划")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("每月更新1-2篇客户案例")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("每季度更新服务内容和价格")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("及时更新联系方式和团队信息")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("10.3 安全维护")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("定期检查网站安全性")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("监控SSL证书有效期")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("备份网站文件和数据库")] }),
      
      // 分页
      new Paragraph({ children: [new PageBreak()] }),
      
      // 第十一章：时间规划与里程碑
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("十一、时间规划与里程碑")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.1 项目时间线")] }),
      createTimelineTable(),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun("11.2 关键里程碑")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "M1 - 网站可访问：", bold: true }), new TextRun("完成Vercel部署，通过域名可访问")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "M2 - 内容完善：", bold: true }), new TextRun("所有必须内容已完善")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "M3 - 功能对接：", bold: true }), new TextRun("表单和统计功能已对接")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "M4 - 正式上线：", bold: true }), new TextRun("完成所有测试，正式对外发布")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "M5 - 备案完成：", bold: true }), new TextRun("ICP备案审核通过（如适用）")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("11.3 风险提示")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "DNS生效延迟：", bold: true }), new TextRun("可能需要等待48小时")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "备案审核时间：", bold: true }), new TextRun("管局审核可能需要20个工作日")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Vercel访问速度：", bold: true }), new TextRun("海外服务器，国内访问可能较慢")] }),
      
      // 结尾
      new Paragraph({ spacing: { before: 600 } }),
      new Paragraph({ 
        children: [new TextRun({ text: "— 文档结束 —", size: 24, color: "999999" })],
        alignment: AlignmentType.CENTER
      }),
    ]
  }]
});

// 辅助函数：创建信息表格
function createInfoTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3000, 6360],
    rows: [
      createTableRow("品牌名称", "青稷树 GreenSeedTree", borders),
      createTableRow("域名", "GreenSeedTree.com", borders),
      createTableRow("域名服务商", "腾讯云", borders),
      createTableRow("网站定位", "AI定制化解决方案专家", borders),
      createTableRow("目标用户", "自媒体创作者、跨境电商企业、制造业/工厂、传统行业老板", borders),
    ]
  });
}

function createTableRow(label, value, borders) {
  return new TableRow({
    children: [
      new TableCell({
        borders,
        width: { size: 3000, type: WidthType.DXA },
        shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true })] })]
      }),
      new TableCell({
        borders,
        width: { size: 6360, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun(value)] })]
      })
    ]
  });
}

// 辅助函数：创建账号表格
function createAccountTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2500, 3500, 3360],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "平台", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "用途", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3360, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "状态", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("GitHub", "代码托管", "待注册", borders),
      createSimpleRow("Vercel", "网站部署", "待注册", borders),
      createSimpleRow("腾讯云", "域名管理", "已有", borders),
      createSimpleRow("百度站长", "SEO优化", "待注册", borders),
    ]
  });
}

function createSimpleRow(col1, col2, col3, borders) {
  return new TableRow({
    children: [
      new TableCell({ borders, width: { size: 2500, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun(col1)] })] }),
      new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun(col2)] })] }),
      new TableCell({ borders, width: { size: 3360, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun(col3)] })] }),
    ]
  });
}

// 辅助函数：创建材料表格
function createMaterialTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3000, 4000, 2360],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 3000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "材料名称", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 4000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "用途", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 2360, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "状态", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("Logo源文件", "网站/宣传物料", "已有", borders),
      createSimpleRow("品牌色值", "设计规范", "已有", borders),
      createSimpleRow("企业营业执照", "ICP备案", "待准备", borders),
      createSimpleRow("法人身份证", "ICP备案", "待准备", borders),
      createSimpleRow("法人手持身份证照片", "ICP备案", "待拍摄", borders),
    ]
  });
}

// 辅助函数：创建DNS表格
function createDNSTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2000, 2000, 3000, 2360],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "记录类型", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "主机记录", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "记录值", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 2360, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "说明", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createDNSRow("A", "@", "76.76.21.21", "Vercel提供", borders),
      createDNSRow("CNAME", "www", "cname.vercel-dns.com", "Vercel提供", borders),
    ]
  });
}

function createDNSRow(col1, col2, col3, col4, borders) {
  return new TableRow({
    children: [
      new TableCell({ borders, width: { size: 2000, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun(col1)] })] }),
      new TableCell({ borders, width: { size: 2000, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun(col2)] })] }),
      new TableCell({ borders, width: { size: 3000, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: col3, font: "Consolas", size: 20 })] })] }),
      new TableCell({ borders, width: { size: 2360, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun(col4)] })] }),
    ]
  });
}

// 辅助函数：创建备案材料表格
function createBeianTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3500, 5860],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "材料名称", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 5860, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "要求", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createBeianRow("营业执照", "彩色扫描件或照片，清晰完整", borders),
      createBeianRow("法人身份证正反面", "彩色扫描件，有效期内的二代身份证", borders),
      createBeianRow("法人手持身份证照片", "法人手持身份证原件拍摄，五官清晰", borders),
      createBeianRow("网站负责人身份证", "如非法人本人，需提供负责人身份证", borders),
      createBeianRow("域名证书", "腾讯云可下载", borders),
    ]
  });
}

function createBeianRow(col1, col2, borders) {
  return new TableRow({
    children: [
      new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun(col1)] })] }),
      new TableCell({ borders, width: { size: 5860, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun(col2)] })] }),
    ]
  });
}

// 辅助函数：创建内容表格
function createContentTable1() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3000, 4000, 2360],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 3000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "内容项", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 4000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "说明", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 2360, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "状态", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("联系邮箱", "替换为真实邮箱", "待确认", borders),
      createSimpleRow("微信号", "替换为真实微信号", "待确认", borders),
      createSimpleRow("Favicon图标", "浏览器标签页图标", "待制作", borders),
      createSimpleRow("移动端菜单", "汉堡菜单功能", "待开发", borders),
      createSimpleRow("Footer Logo", "统一使用品牌Logo", "待更新", borders),
    ]
  });
}

function createContentTable2() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3000, 4000, 2360],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 3000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "内容项", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 4000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "说明", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 2360, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "状态", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("客户案例", "添加真实客户案例", "待补充", borders),
      createSimpleRow("团队介绍", "添加团队成员信息", "待补充", borders),
      createSimpleRow("隐私政策", "添加隐私政策页面", "待创建", borders),
      createSimpleRow("服务条款", "添加服务条款页面", "待创建", borders),
    ]
  });
}

// 辅助函数：创建SEO表格
function createSEOTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2500, 4000, 2860],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "配置项", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 4000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "说明", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 2860, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "状态", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("Title标签", "青稷树 GreenSeedTree - AI定制化解决方案专家", "已完成", borders),
      createSimpleRow("Meta Description", "从需求诊断到工具落地，一站式AI定制解决方案", "已完成", borders),
      createSimpleRow("Meta Keywords", "AI定制,AI解决方案,人工智能,工作流自动化", "已完成", borders),
      createSimpleRow("Favicon", "浏览器标签页图标（16x16, 32x32）", "待制作", borders),
      createSimpleRow("robots.txt", "搜索引擎爬虫规则文件", "待创建", borders),
      createSimpleRow("sitemap.xml", "网站地图文件", "待创建", borders),
    ]
  });
}

// 辅助函数：创建表单对接表格
function createFormTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2500, 3500, 3360],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "方案", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "特点", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3360, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "推荐度", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("Formspree", "免费，无需后端，邮件通知", "推荐", borders),
      createSimpleRow("腾讯问卷", "国内服务，稳定可靠", "推荐", borders),
      createSimpleRow("自建后端", "完全可控，需要服务器", "可选", borders),
    ]
  });
}

// 辅助函数：创建统计方案表格
function createAnalyticsTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2500, 3500, 3360],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "工具", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "特点", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3360, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "推荐度", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("百度统计", "国内服务，数据详细", "推荐", borders),
      createSimpleRow("Google Analytics", "功能强大，国际标准", "推荐", borders),
      createSimpleRow("Vercel Analytics", "与Vercel集成，简单易用", "可选", borders),
    ]
  });
}

// 辅助函数：创建测试表格
function createTestTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3500, 3000, 2860],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "测试项", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "预期结果", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 2860, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "测试结果", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("域名访问", "正常打开网站", "待测试", borders),
      createSimpleRow("页面加载", "3秒内完成加载", "待测试", borders),
      createSimpleRow("导航跳转", "平滑滚动到对应区域", "待测试", borders),
      createSimpleRow("表单提交", "成功提交并收到通知", "待测试", borders),
      createSimpleRow("移动端适配", "布局正常，无横向滚动", "待测试", borders),
      createSimpleRow("SSL证书", "HTTPS正常访问", "待测试", borders),
    ]
  });
}

// 辅助函数：创建维护表格
function createMaintenanceTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2500, 3500, 3360],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "维护项", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "频率", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3360, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "负责人", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("网站可用性监控", "每日自动", "Vercel", borders),
      createSimpleRow("数据备份", "每周", "技术人员", borders),
      createSimpleRow("内容更新", "每月", "运营人员", borders),
      createSimpleRow("安全检查", "每季度", "技术人员", borders),
      createSimpleRow("性能优化", "每季度", "技术人员", borders),
    ]
  });
}

// 辅助函数：创建时间线表格
function createTimelineTable() {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2000, 3500, 3860],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "阶段", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "工作内容", bold: true, color: "FFFFFF" })] })] }),
          new TableCell({ borders, width: { size: 3860, type: WidthType.DXA }, shading: { fill: "16A34A", type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: "预计时间", bold: true, color: "FFFFFF" })] })] }),
        ]
      }),
      createSimpleRow("第一阶段", "GitHub + Vercel部署", "1天", borders),
      createSimpleRow("第二阶段", "DNS配置 + 域名绑定", "1-2天", borders),
      createSimpleRow("第三阶段", "内容完善 + 功能对接", "2-3天", borders),
      createSimpleRow("第四阶段", "测试验收", "1天", borders),
      createSimpleRow("第五阶段", "ICP备案（可选）", "5-20工作日", borders),
    ]
  });
}

// 生成文档
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("D:/DuMate/GreenSeedTree-Website/docs/青稷树网站上线SOP-V1.0.docx", buffer);
  console.log("Word文档已生成：D:/DuMate/GreenSeedTree-Website/docs/青稷树网站上线SOP-V1.0.docx");
});
