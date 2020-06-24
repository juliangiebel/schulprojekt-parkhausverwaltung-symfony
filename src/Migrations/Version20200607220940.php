<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200607220940 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE lt_parker DROP customer_id');
        $this->addSql('ALTER TABLE occupancy ADD ltParker_id INT DEFAULT NULL, DROP lt_parker_nr');
        $this->addSql('ALTER TABLE occupancy ADD CONSTRAINT FK_850E50F6B0D8C331 FOREIGN KEY (ltParker_id) REFERENCES lt_parker (id)');
        $this->addSql('CREATE INDEX IDX_850E50F6B0D8C331 ON occupancy (ltParker_id)');
        $this->addSql('ALTER TABLE ticket ADD occupancy_id INT DEFAULT NULL, DROP ticket_nr, DROP license_plate, DROP entry_date');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA38A0BBA84 FOREIGN KEY (occupancy_id) REFERENCES occupancy (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_97A0ADA38A0BBA84 ON ticket (occupancy_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE lt_parker ADD customer_id VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE occupancy DROP FOREIGN KEY FK_850E50F6B0D8C331');
        $this->addSql('DROP INDEX IDX_850E50F6B0D8C331 ON occupancy');
        $this->addSql('ALTER TABLE occupancy ADD lt_parker_nr VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, DROP ltParker_id');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA38A0BBA84');
        $this->addSql('DROP INDEX UNIQ_97A0ADA38A0BBA84 ON ticket');
        $this->addSql('ALTER TABLE ticket ADD ticket_nr VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD license_plate VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD entry_date DATETIME NOT NULL, DROP occupancy_id');
    }
}
