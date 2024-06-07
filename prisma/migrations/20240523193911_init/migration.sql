-- CreateTable
CREATE TABLE "Redirect" (
    "id" SERIAL NOT NULL,
    "subdomain" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_subdomain_key" ON "Redirect"("subdomain");

-- Insert seed data
INSERT INTO "Redirect" ("subdomain", "url") VALUES
('join', 'https://whale.io/?start=ba4e173db1944c1d'),
('punks', 'https://whale.io/?start=8470633d94cf2b31'),
('betconverter', 'https://whale.io/?start=6d680eaaaa1b4f56'),
('bc', 'https://whale.io/?start=6d680eaaaa1b4f56'),
('a', 'https://whale.io/?start=efc0d59b1fbf5a06'),
('www', 'https://whale.tg'),
('pppddd', 'https://whale.io/?start=81d5b6a1e177c878'),
('whale.tg', 'https://t.me/whale'),
('58', 'https://whale.io/?start=685a16424bcf133b'),
('binga', 'https://whale.io/?start=685a16424bcf133b'),
('binga58', 'https://whale.io/?start=685a16424bcf133b'),
('brettlee58', 'https://whale.io/?start=685a16424bcf133b'),
('go', 'https://whale.io/?start=6010e99b4beb8049'),
('stream', 'https://whale.io/?start=9c19bcb482734d45'),
('promo', 'https://whale.io/?start=a28bf763f70ef9cc'),
('whalegamesjp', 'https://whale.io/?start=3f3b4db085d8fe69'),
('cream', 'https://whale.io/?start=192bb296a57bc022'),
('dxb', 'https://whale.io/?start=fbb98895966e39e1'),
('cancandy', 'https://whale.io/?start=fbb98895966e39e1');
