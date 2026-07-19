import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Regions } from "./payload/collections/Regions";
import { Conditions } from "./payload/collections/Conditions";
import { Treatments } from "./payload/collections/Treatments";
import { Posts } from "./payload/collections/Posts";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { HomePage } from "./payload/globals/HomePage";
import { Pages } from "./payload/globals/Pages";
import { UI } from "./payload/globals/UI";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "· Dr. João Cláudio Miranda",
    },
  },
  collections: [Regions, Conditions, Treatments, Posts, Media, Users],
  globals: [SiteSettings, HomePage, Pages, UI],
  cors: ["https://joaoclaudiomiranda.com"],
  csrf: ["https://joaoclaudiomiranda.com"],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  sharp,
  i18n: { fallbackLanguage: "pt" }, // painel admin em português
});
