<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class EntryMachineController extends AbstractController
{
    /**
     * @Route("/entry/machine", name="entry_machine")
     */
    public function index()
    {
        return $this->render('entry_machine/index.html.twig', [
            'libPath' => '../../../public/lib',
        ]);
    }
}
