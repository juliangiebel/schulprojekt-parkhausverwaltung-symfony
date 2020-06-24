<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200608204028 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE occupancy DROP FOREIGN KEY FK_850E50F6B0D8C331');
        $this->addSql('DROP INDEX IDX_850E50F6B0D8C331 ON occupancy');
        $this->addSql('ALTER TABLE occupancy ADD lt_parker VARCHAR(255) DEFAULT NULL, DROP ltParker_id');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA38A0BBA84');
        $this->addSql('DROP INDEX UNIQ_97A0ADA38A0BBA84 ON ticket');
        $this->addSql('ALTER TABLE ticket CHANGE occupancy_id occupancy INT DEFAULT NULL');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA3850E50F6 FOREIGN KEY (occupancy) REFERENCES occupancy (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_97A0ADA3850E50F6 ON ticket (occupancy)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE occupancy ADD ltParker_id INT DEFAULT NULL, DROP lt_parker');
        $this->addSql('ALTER TABLE occupancy ADD CONSTRAINT FK_850E50F6B0D8C331 FOREIGN KEY (ltParker_id) REFERENCES lt_parker (id)');
        $this->addSql('CREATE INDEX IDX_850E50F6B0D8C331 ON occupancy (ltParker_id)');
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA3850E50F6');
        $this->addSql('DROP INDEX UNIQ_97A0ADA3850E50F6 ON ticket');
        $this->addSql('ALTER TABLE ticket CHANGE occupancy occupancy_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA38A0BBA84 FOREIGN KEY (occupancy_id) REFERENCES occupancy (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_97A0ADA38A0BBA84 ON ticket (occupancy_id)');
    }
}
