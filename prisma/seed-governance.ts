import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding governance data...')

  // ── Update Carole DESNOST as President ──
  const carole = await prisma.coriferTeamMember.findFirst({ where: { name: { contains: 'Pujol' } } })
  if (carole) {
    await prisma.coriferTeamMember.update({
      where: { id: carole.id },
      data: {
        name: 'Carole DESNOST',
        role: 'Présidente du CORIFER',
        org: 'SNCF',
        title: 'Vice-Présidente du Directoire SNCF – Ambassadrice France 2030',
        featured: true,
        order: 0,
      },
    })
    console.log('  ✓ Updated Carole DESNOST as President')
  } else {
    await prisma.coriferTeamMember.create({
      data: {
        name: 'Carole DESNOST',
        role: 'Présidente du CORIFER',
        org: 'SNCF',
        title: 'Vice-Présidente du Directoire SNCF – Ambassadrice France 2030',
        featured: true,
        order: 0,
      },
    })
    console.log('  ✓ Created Carole DESNOST as President')
  }

  // ── Ensure JJ Mogoro is Secretary ──
  const jj = await prisma.coriferTeamMember.findFirst({ where: { name: { contains: 'Mogoro' } } })
  if (jj) {
    await prisma.coriferTeamMember.update({
      where: { id: jj.id },
      data: {
        name: 'Jean-Jacques MOGORO',
        role: 'Secrétaire du CORIFER',
        org: 'FIF',
        title: 'Directeur Pôle Industrie – Fédération des Industries Ferroviaires',
        featured: true,
        order: 1,
      },
    })
    console.log('  ✓ Updated Jean-Jacques MOGORO')
  }

  // ── CoPil members (14 + 4 invités) ──
  const copilMembers = [
    { name: 'Représentant DGITM', role: 'Membre CoPil', org: 'Ministère des Transports', title: 'CoPil', order: 10 },
    { name: 'Représentant DGE', role: 'Membre CoPil', org: 'Ministère de l\'Économie', title: 'CoPil', order: 11 },
    { name: 'Représentant DGRI', role: 'Membre CoPil', org: 'Ministère de la Recherche', title: 'CoPil', order: 12 },
    { name: 'Représentant SNCF', role: 'Membre CoPil', org: 'SNCF', title: 'CoPil', order: 13 },
    { name: 'Représentant SNCF Réseau', role: 'Membre CoPil', org: 'SNCF Réseau', title: 'CoPil', order: 14 },
    { name: 'Représentant RATP', role: 'Membre CoPil', org: 'RATP', title: 'CoPil', order: 15 },
    { name: 'Représentant Alstom', role: 'Membre CoPil', org: 'Alstom', title: 'CoPil', order: 16 },
    { name: 'Représentant Thales', role: 'Membre CoPil', org: 'Thales', title: 'CoPil', order: 17 },
    { name: 'Représentant CAF', role: 'Membre CoPil', org: 'CAF France', title: 'CoPil', order: 18 },
    { name: 'Représentant Faiveley', role: 'Membre CoPil', org: 'Faiveley Transport', title: 'CoPil', order: 19 },
    { name: 'Représentant Railenium', role: 'Membre CoPil', org: 'IRT Railenium', title: 'CoPil', order: 20 },
    { name: 'Représentant FIF', role: 'Membre CoPil', org: 'FIF', title: 'CoPil', order: 21 },
    { name: 'Représentant AIF', role: 'Membre CoPil', org: 'AIF', title: 'CoPil', order: 22 },
    { name: 'Représentant Ferrocampus', role: 'Membre CoPil', org: 'Ferrocampus', title: 'CoPil', order: 23 },
    // 4 invités permanents
    { name: 'Représentant ADEME', role: 'Invité permanent CoPil', org: 'ADEME', title: 'CoPil-Invite', order: 30 },
    { name: 'Représentant Bpifrance', role: 'Invité permanent CoPil', org: 'Bpifrance', title: 'CoPil-Invite', order: 31 },
    { name: 'Représentant ANR', role: 'Invité permanent CoPil', org: 'ANR', title: 'CoPil-Invite', order: 32 },
    { name: 'Représentant Régions de France', role: 'Invité permanent CoPil', org: 'Régions de France', title: 'CoPil-Invite', order: 33 },
  ]

  for (const m of copilMembers) {
    const existing = await prisma.coriferTeamMember.findFirst({ where: { name: m.name, org: m.org } })
    if (!existing) {
      await prisma.coriferTeamMember.create({ data: { ...m, featured: false } })
      console.log(`  ✓ Created ${m.name} (${m.org})`)
    } else {
      console.log(`  - Already exists: ${m.name}`)
    }
  }

  // ── Comité R&D members ──
  const rdMembers = [
    { name: 'Président COSS Railenium', role: 'Président Comité R&D', org: 'IRT Railenium', title: 'ComiteRD', order: 40 },
    { name: 'Représentant R&D SNCF', role: 'Membre Comité R&D', org: 'SNCF', title: 'ComiteRD', order: 41 },
    { name: 'Représentant R&D Alstom', role: 'Membre Comité R&D', org: 'Alstom', title: 'ComiteRD', order: 42 },
    { name: 'Représentant R&D RATP', role: 'Membre Comité R&D', org: 'RATP', title: 'ComiteRD', order: 43 },
    { name: 'Représentant Université Gustave Eiffel', role: 'Membre Comité R&D', org: 'Univ. Gustave Eiffel', title: 'ComiteRD', order: 44 },
  ]

  for (const m of rdMembers) {
    const existing = await prisma.coriferTeamMember.findFirst({ where: { name: m.name, org: m.org } })
    if (!existing) {
      await prisma.coriferTeamMember.create({ data: { ...m, featured: false } })
      console.log(`  ✓ Created ${m.name}`)
    }
  }

  // ── Comité PME members ──
  const pmeMembers = [
    { name: 'Président RBC/FIF', role: 'Président Comité PME', org: 'FIF - Railway Business Cluster', title: 'ComitePME', order: 50 },
    { name: 'Représentant PME 1', role: 'Membre Comité PME', org: 'PME ferroviaire', title: 'ComitePME', order: 51 },
    { name: 'Représentant PME 2', role: 'Membre Comité PME', org: 'PME ferroviaire', title: 'ComitePME', order: 52 },
    { name: 'Représentant Bpifrance PME', role: 'Membre Comité PME', org: 'Bpifrance', title: 'ComitePME', order: 53 },
  ]

  for (const m of pmeMembers) {
    const existing = await prisma.coriferTeamMember.findFirst({ where: { name: m.name, org: m.org } })
    if (!existing) {
      await prisma.coriferTeamMember.create({ data: { ...m, featured: false } })
      console.log(`  ✓ Created ${m.name}`)
    }
  }

  const total = await prisma.coriferTeamMember.count()
  console.log(`\nDone! ${total} team members total.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
