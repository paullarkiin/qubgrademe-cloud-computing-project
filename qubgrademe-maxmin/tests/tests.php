<?php
declare(strict_types=1);
require __DIR__ . "/../src/functions.inc.php"
use PHPUnit\Framework\TestCase;

final class Tests extends TestCase
{

    public function testWithValidRequest(): void
    {
            $expectedOutput = '{"error":false,"func":"maxmin","modules":["One","Two","Five","Three","Seven"],"marks":["1","2","5","3","7"],"max_module":"Seven - 7","min_module":"One - 1"}';
            $curl = curl_init("http://maxmin.40294644.qpc.hal.davecutting.uk/?module_1=One&module_2=Two&module_3=Five&module_4=Three&module_5=Seven&mark_1=1&mark_2=2&mark_3=5&mark_4=3&mark_5=7");
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

    public function return_maxmin_of_values()
    {
        $modules = array("One", "Five", "Two", "Three", "Seven");
        $marks = array("80", "61", "64", "71", "60");

        $expected = array("One - 80", "Seven - 60");
        $result = getMaxMin($modules, $marks);

        $this->assertEquals($expected, $result);
    }

    public function return_maxmin_missing_values()
    {
        $modules = array("One", "Five", "Two", "Three", "");
        $marks = array(75, 63, 68, 42, null);

        $expected = array("CSC 3021 - 75", "CSC 3068 - 42");
        $result = getMaxMin($modules, $marks);

        $this->assertEquals($expected, $result);
    }

    
}