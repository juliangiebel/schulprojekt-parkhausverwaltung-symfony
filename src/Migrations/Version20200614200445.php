<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200614200445 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE occupancy DROP FOREIGN KEY FK_850E50F671A80B8B');
        $this->addSql('DROP INDEX IDX_850E50F671A80B8B ON occupancy');
        $this->addSql('ALTER TABLE occupancy CHANGE ltparker lt_parker INT DEFAULT NULL');
        $this->addSql('ALTER TABLE occupancy ADD CONSTRAINT FK_850E50F62D9CF032 FOREIGN KEY (lt_parker) REFERENCES lt_parker (id)');
        $this->addSql('CREATE INDEX IDX_850E50F62D9CF032 ON occupancy (lt_parker)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE occupancy DROP FOREIGN KEY FK_850E50F62D9CF032');
        $this->addSql('DROP INDEX IDX_850E50F62D9CF032 ON occupancy');
        $this->addSql('ALTER TABLE occupancy CHANGE lt_parker ltParker INT DEFAULT NULL');
        $this->addSql('ALTER TABLE occupancy ADD CONSTRAINT FK_850E50F671A80B8B FOREIGN KEY (ltParker) REFERENCES lt_parker (id)');
        $this->addSql('CREATE INDEX IDX_850E50F671A80B8B ON occupancy (ltParker)');
    }
}
