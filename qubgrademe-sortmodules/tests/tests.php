<?php
declare(strict_types=1);
require('functions.inc.php');
use PHPUnit\Framework\TestCase;

final class Tests extends TestCase
{

    public function testWithValidRequest(): void
    {
            $expectedOutput = '{"error":false,"func":"sort","modules":["One","Two","Five","Three","Seven"],"marks":["1","2","5","3","7"],"sorted_modules":[{"module":"Seven","marks":"7"},{"module":"Five","marks":"5"},{"module":"Three","marks":"3"},{"module":"Two","marks":"2"},{"module":"One","marks":"1"}]}';

            $curl = curl_init("http://sort.40294644.qpc.hal.davecutting.uk/?module_1=One&module_2=Two&module_3=Five&module_4=Three&module_5=Seven&mark_1=1&mark_2=2&mark_3=5&mark_4=3&mark_5=7");
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

            $output = curl_exec($curl);
            print(gettype($output));
            $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

            curl_close($curl);

            $this->assertEquals(
                200,
                $code
            );
            $this->assertEquals(
                $expectedOutput,
                $output
            );
    }
    public function sort_in_descending_order() 

    {
            $modules = array("One","Two","Five","Three","Seven");
            $marks = array(70, 63, 68, 71, 60);
            $expected = array(
                array(
                    "module" => "Three", 
                    "marks" => 71
                ),
                array(
                    "module" => "One",
                    "marks" => 70
                ),
                array(
                    "module" => "Five",
                    "marks" => 68
                ),
                array(
                    "module" => "Two",
                    "marks" => 63
                ),
                array(
                    "module" => "Seven",
                    "marks" => 60
                ),
            );
            $result = getSortedModules($modules, $marks);
            $this->assertEquals($expected, $result);
    }

    public function sort_pairs_missing()
    {
        
            $modules = array("One","Two","Five","Three","Seven");
            $marks = array(70, 63, 68, 71, 60);
            $expected = array(
                array(
                    "module" => "Three", 
                    "marks" => 71
                ),
                array(
                    "module" => "One",
                    "marks" => 70
                ),
                array(
                    "module" => "Five",
                    "marks" => 68
                ),
                array(
                    "module" => "Two",
                    "marks" => 63
                ),
                array(
                    "module" => "",
                    "marks" => 60
                ),
            );
            $result = getSortedModules($modules, $marks);
            $this->assertEquals($expected, $result);
    }

    
}