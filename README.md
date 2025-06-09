npm install เพื่อติดตั้งโปรเจก

//สิ่งที่ติดตั้ง
<!-- ติดตั้ง nextjs -->

npx create-next-app@latest

<!-- ติดตั้ง prisma -->

npx install prisma --save-dev
npx prisma init
npm install @prisma/client

//อัพเข้าไปในฐานข้อมูลใช้
npx prisma db push \*\*mongodb ใช้ migrate ไม่ได้ ใช้ได้แค่ SQL

<!-- Config -->

import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

<!-- Shadcn -->

npx shadcn@latest init
npx shadcn@latest add button dialog input label select

npm i react-toastify

<!-- รู้จักกับ Method ของ prisma && Syntax && Argument -->

await prisma.user.create()

create()
createMany()
upsert()

findUnique()
findFirst()
findMany()

update()
updateMany()

delete()
deleteMany()

where //เงื่อนไขการค้นหา
data // ข้อมูลที่ต้องการสร้าง
skipDuplicates //ข้ามข้อมูลที่ซ้ำ (เช่น field ที่ @unique)
orderBy //เรียงลำดับผลลัพธ์
select //เลือกเฉพาะ field
include //รวมความสัมพันธ์ (relations)
take // จำนวนที่จะดึง (limit)
