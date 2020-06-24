<?php

namespace App\Entity;

use App\Repository\LtParkerRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ORM\Entity(repositoryClass=LtParkerRepository::class)
 * @ApiResource
 */
class LtParker
{
	/**
	 * @var int LtParker id
	 *
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $name;

	/**
	 * @var string
	 *
	 * @ORM\Column(type="string", length=255)
	 */
	private $surename;

	public function getId(): ?int {
		return $this->id;
	}

	public function getName(): ?string {
		return $this->name;
	}

	public function setName(string $name): self {
		$this->name = $name;

		return $this;
	}

	public function getSurename(): ?string {
		return $this->surename;
	}

	public function setSurename(string $surename): self {
		$this->surename = $surename;

		return $this;
	}
}
