// Regenerates seedData.json from Frontend/src/data/portfolioData.js (run: node generate-seed-data.js)
const fs=require('fs'),vm=require('vm'),path=require('path');
const FE=path.join(__dirname,'../Frontend/src/data');
let t=fs.readFileSync(path.join(FE,'portfolioData.js'),'utf8');
const certs=fs.readFileSync(path.join(FE,'certifications.json'),'utf8');
t=t.replace(/import certifications[^\n]*\n/,`const certifications = ${certs};\n`).replace('export const FALLBACK_DATA','globalThis.D');
const c={};vm.runInNewContext(t,c);const D=c.D;
const dt=(s='')=>{const m=s.match(/([A-Z][a-z]{2}) (\d{4})/);return m?new Date(`${m[1]} 1, ${m[2]}`):undefined;};
const per=p=>p.split(/[–-]/).map(x=>x.trim());
const out={
 profile:{name:D.name,title:D.role,bio:D.heroDescription,email:D.contact.email,phone:D.contact.phone,location:D.contact.location,profileImage:null,resume:null},
 about:{description:D.about.introDescription,highlights:D.about.highlights},
 skills:D.skillCategories.map(x=>({category:x.name,items:x.skills.map(s=>s.name)})),
 education:D.education.map(e=>{const [a,b]=per(e.period);return{institution:e.school,degree:e.degree,startDate:dt('Jan '+a)||new Date(`Jan 1, ${a}`),endDate:dt(b)||new Date(`Jan 1, ${b}`),description:e.note}}),
 experience:D.experience.map(e=>{const [a,b]=per(e.period);const cur=/Present/.test(e.period);return{company:e.org,position:e.role,startDate:dt(a)||new Date('Jan 1, 2020'),endDate:cur?undefined:(dt(b)||new Date('Dec 1, 2023')),current:cur,description:e.desc||'',technologies:[]}}),
 projects:D.projects.map(p=>({title:p.title,description:p.description,technologies:p.tags.split(',').map(x=>x.trim()),liveUrl:p.liveUrl,githubUrl:p.githubUrl,featured:p.isFeatured})),
 certifications:D.certifications,
 achievement:D.achievement,
 contact:{email:D.contact.email,phone:D.contact.phone,social:{linkedin:D.socials[1].href,github:D.socials[0].href,website:''}}
};
fs.writeFileSync(path.join(__dirname,'seedData.json'),JSON.stringify(out,null,1));
console.log('seedData.json written:',out.experience.length,'roles,',out.certifications.length,'certs');
