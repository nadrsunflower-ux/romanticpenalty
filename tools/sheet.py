import sys
from PIL import Image, ImageDraw, ImageFont
out=sys.argv[1]; files=sys.argv[2:]
W,H=800,450; cols=2; rows=(len(files)+1)//2
sheet=Image.new('RGB',(W*cols+10,(H+30)*rows),'#222')
d=ImageDraw.Draw(sheet)
try: f=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',18)
except: f=None
for i,p in enumerate(files):
    im=Image.open(p).convert('RGB').resize((W,H),Image.LANCZOS)
    x=(i%cols)*(W+10); y=(i//cols)*(H+30)
    sheet.paste(im,(x,y+26)); d.text((x+6,y+3),p.split('/')[-1],fill='#fff',font=f)
sheet.save(out)
