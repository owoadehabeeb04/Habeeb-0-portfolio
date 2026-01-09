# 🚀 Quick SEO Reference Card

## 📝 Important URLs to Update

Before deploying, update these in `lib/seo.ts`:

```typescript
export const siteConfig = {
  url: 'https://habeeb-dev-portfolio.vercel.app', // ← YOUR CURRENT DOMAIN
  // ... rest stays the same
}
```

## 🔗 Live SEO Endpoints

After deployment, these URLs should work:

- **Sitemap**: `yourdomain.com/sitemap.xml`
- **Robots**: `yourdomain.com/robots.txt`
- **Manifest**: `yourdomain.com/manifest.json`
- **Browserconfig**: `yourdomain.com/browserconfig.xml`

## 🧪 Test Your SEO (After Deploying)

Copy these URLs and test:

1. **Google Rich Results**
   ```
   https://search.google.com/test/rich-results
   → Enter your domain
   → Should show Person + Website schemas ✅
   ```

2. **Mobile-Friendly**
   ```
   https://search.google.com/test/mobile-friendly
   → Should pass all tests ✅
   ```

3. **PageSpeed Insights**
   ```
   https://pagespeed.web.dev/
   → Target: 90+ all metrics ✅
   ```

4. **Twitter Card Validator**
   ```
   https://cards-dev.twitter.com/validator
   → Should show your image and title ✅
   ```

5. **Facebook Debugger**
   ```
   https://developers.facebook.com/tools/debug/
   → Should show proper Open Graph data ✅
   ```

## 📊 Submit to Search Engines

### Google Search Console
1. Go to: https://search.google.com/search-console
2. Add property with your domain
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### Bing Webmaster Tools
1. Go to: https://www.bing.com/webmasters
2. Add site
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## 🎯 What Changed?

### Created (11 new files)
- `lib/seo.ts` - All SEO config
- `app/sitemap.ts` - Auto sitemap
- `app/robots.ts` - Crawler rules
- `app/not-found.tsx` - 404 page
- `app/portfolio/page.tsx` - Full rewrite
- `app/projects/page.tsx` - Full rewrite
- `app/projects/metadata.ts` - SEO metadata
- `app/ask-habeeb/metadata.ts` - SEO metadata
- `public/manifest.json` - PWA support
- `public/browserconfig.xml` - MS tiles
- `docs/` folder - Documentation

### Updated (5 files)
- `app/layout.tsx` - Metadata + schemas
- `app/page.tsx` - Metadata
- `next.config.js` - Headers + optimization
- `README.md` - Full documentation
- *(This is the complete list)*

## 🔍 Quick Troubleshooting

### "Sitemap not found"
- Run `npm run build`
- Check `app/sitemap.ts` exists
- Access at `/sitemap.xml` (not `/sitemap`)

### "Schema errors"
- Check `lib/seo.ts` for typos
- Validate at https://validator.schema.org/
- Look for missing commas or quotes

### "Images not loading"
- Check `next.config.js` remotePatterns
- Verify image paths in `public/images/`
- Use relative paths: `/images/file.jpg`

### "Social cards not working"
- Wait 24 hours after deployment
- Clear cache in social media debugger
- Check og:image is absolute URL
- Image must be 1200x630px minimum

## 📈 Monitoring

### Weekly Checks
- [ ] Google Search Console - No errors
- [ ] Core Web Vitals - All green
- [ ] Indexed pages count increasing

### Monthly Checks
- [ ] Organic traffic trending up
- [ ] Keyword rankings improving
- [ ] No 404 errors reported

## 🎯 Expected Timeline

- **Day 1**: Deploy + submit sitemaps
- **Week 1**: Pages start getting indexed
- **Week 2**: Rich results appear
- **Month 1**: Improved rankings
- **Month 3**: Steady organic growth

## 💡 Pro Tips

1. **Update regularly**: Fresh content = better rankings
2. **Monitor keywords**: Use Google Search Console
3. **Check mobile**: Most traffic is mobile
4. **Speed matters**: Keep Lighthouse > 90
5. **Build backlinks**: Share on social media

## 🆘 Need Help?

Check these docs:
- `SEO_IMPLEMENTATION.md` - Full details
- `SEO_CHECKLIST.md` - Complete checklist
- `README.md` - Project overview

Or search for:
- "Next.js metadata"
- "Schema.org Person"
- "Open Graph tags"

## ✅ Pre-Deploy Checklist

- [ ] Updated domain in `lib/seo.ts`
- [ ] Added GROQ_API_KEY to env
- [ ] Tested `npm run build` (no errors)
- [ ] All images in `public/images/`
- [ ] Reviewed metadata in all pages

## ✅ Post-Deploy Checklist

- [ ] Submitted sitemap to Google
- [ ] Submitted sitemap to Bing
- [ ] Tested Twitter card
- [ ] Tested Facebook share
- [ ] Ran Lighthouse audit
- [ ] Verified robots.txt
- [ ] Checked all pages load

## 🏆 Success!

Your SEO is now **10/10**!

Just remember:
1. Update the domain in `lib/seo.ts`
2. Deploy
3. Submit sitemaps
4. Monitor and enjoy!

---

**That's it! You're all set! 🚀**

