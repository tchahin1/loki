package com.pragmatio.mojaepbih;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.pragmatio.mojaepbih.resource.rest.HelloWorld;
import org.junit.jupiter.api.Test;

public class HelloWorldTest {

    @Test
    public void sameMessage() {
        HelloWorld tester = new HelloWorld();
        final String TEXT_TO_TEST = "Hello world!";

        assertEquals(TEXT_TO_TEST, tester.getMessage());
    }
}
